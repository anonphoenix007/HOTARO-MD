/*
██╗  ██╗ ██████╗ ████████╗ █████╗ ██████╗  ██████╗       ███╗   ███╗██████╗ 
██║  ██║██╔═══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗      ████╗ ████║██╔══██╗
███████║██║   ██║   ██║   ███████║██████╔╝██║   ██║█████╗██╔████╔██║██║  ██║
██╔══██║██║   ██║   ██║   ██╔══██║██╔══██╗██║   ██║╚════╝██║╚██╔╝██║██║  ██║
██║  ██║╚██████╔╝   ██║   ██║  ██║██║  ██║╚██████╔╝      ██║ ╚═╝ ██║██████╔╝
╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝       ╚═╝     ╚═╝╚═════╝
 By : Taira Makino
 Github : https://github.com/anonphoenix007
 WhatsApp : https://wa.me/2347080968564
*/                                                                                                                                                    


const pino = require("pino");
const path = require("path");
const fs = require("fs");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  Browsers,
  delay,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");
const { PausedChats } = require("../database");
const config = require("../config");
const plugins = require("./plugins");
const { serialize, Greetings } = require("./index");
const { Image, Message, Sticker, Video, AllMessage } = require("./Messages");
const io = require("socket.io-client");
const { getSession } = require("./session")
const {
  loadMessage,
  saveMessage,
  saveChat,
  getName,
} = require("../database/StoreDb");
const { exec } = require("child_process");
const logger = pino({ level: "silent" });
const connect = async () => {
  const Xasena = async () => {
    try {
      const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/taira_baileys/");
      const { version, isLatest } = await fetchLatestBaileysVersion();

      let conn = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: logger,
        browser: Browsers.macOS("Desktop"),
        downloadHistory: false,
        syncFullHistory: false,
        markOnlineOnConnect: false,
        emitOwnEvents: true,
        getMessage: async (key) => {
          return (loadMessage(key.id) || {}).message || { conversation: "ᴸᴼ♱ᴿᴰ☠︎︎Makino" };
        },
      });
      conn.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect } = s;
        if (connection === "connecting") {
          console.log("ℹ Connecting to WhatsApp... Please Wait.");
        }
        if (connection === "open") {
          console.log("✅ Login to WhatsApp Successful!");
          const packageVersion = require("../package.json").version;
          const totalPlugins = plugins.commands.length;
          const workType = config.WORK_TYPE;
          const mess = `
           *┃ Version:* ${packageVersion}
           *┃ Plugins:* ${totalPlugins}
           *┃ MODE:* ${workType}
           *┃ PREFIX:* ${config.HANDLERS}
           *┃ MODS:* ${config.SUDO}
           `
           await delay(10000);
          conn.sendMessage(conn.user.id, { text: mess });
        }

        if (connection === "close") {
          if (
            lastDisconnect.error?.output?.statusCode !==
            DisconnectReason.loggedOut
          ) {
            await delay(300);
            Xasena();
            console.log("Reconnecting...");
          } else {
            console.log("Connection closed. Device logged out.");
            await delay(3000);
            process.exit(0);
          }
        }
      });

      conn.ev.on("creds.update", saveCreds);
      conn.ev.on("group-participants.update", async (data) => {
        Greetings(data, conn);
      });
      conn.ev.on("chats.update", async (chats) => {
        chats.forEach(async (chat) => {
          await saveChat(chat);
        });
      });
      conn.ev.on("messages.upsert", async (m) => {
        if (m.type !== "notify") return;
        let msg = await serialize(
          JSON.parse(JSON.stringify(m.messages[0])),
          conn
        );
        await saveMessage(m.messages[0], msg.sender);
        if (config.AUTO_READ) await conn.readMessages(msg.key);
        if (config.AUTO_STATUS_READ && msg.from === "status@broadcast")
          await conn.readMessages(msg.key);

        let text_msg = msg.body;
        if (!msg) return;
        const regex = new RegExp(`${config.HANDLERS}( ?resume)`, "is");
        isResume = regex.test(text_msg);
        const chatId = msg.from;
        try {
          const pausedChats = await PausedChats.getPausedChats();
          if (
            pausedChats.some(
              (pausedChat) => pausedChat.chatId === chatId && !isResume
            )
          ) {
            return;
          }
        } catch (error) {
          console.error(error);
        }
        if (config.LOGS) {
          let name = await getName(msg.sender);
          console.log(
            `ɴᴇᴡ ᴍᴇssᴀғᴇ ɪɴ : ${
              msg.from.endsWith("@g.us")
                ? (await conn.groupMetadata(msg.from)).subject
                : msg.from
            }\nsᴇɴᴅᴇʀ : ${name}\nMessage:${text_msg ? text_msg : msg.type}`
          );
        }
        plugins.commands.map(async (command) => {
          if (command.fromMe && !msg.sudo) return;
          let comman = text_msg;
          msg.prefix = new RegExp(config.HANDLERS).test(text_msg)
            ? text_msg[0].toLowerCase()
            : "!";
          let whats;
          switch (true) {
            case command.pattern && command.pattern.test(comman):
              let match;
              try {
                match = text_msg
                  .replace(new RegExp(command.pattern, "i"), "")
                  .trim();
              } catch {
                match = false;
              }
              whats = new Message(conn, msg);
              command.function(whats, match, msg, conn);
              break;
            case text_msg && command.on === "text":
              whats = new Message(conn, msg);
              command.function(whats, text_msg, msg, conn, m);
              break;
            case command.on === "image" || command.on === "photo":
              if (msg.type === "imageMessage") {
                whats = new Image(conn, msg);
                command.function(whats, text_msg, msg, conn, m);
              }
              break;
            case command.on === "sticker":
              if (msg.type === "stickerMessage") {
                whats = new Sticker(conn, msg);
                command.function(whats, msg, conn, m);
              }
              break;
            case command.on === "video":
              if (msg.type === "videoMessage") {
                whats = new Video(conn, msg);
                command.function(whats, msg, conn, m);
              }
              break;
            case command.on === "delete":
              if (msg.type === "protocolMessage") {
                whats = new Message(conn, msg);
                whats.messageId = msg.message.protocolMessage.key.id;
                command.function(whats, msg, conn, m);
              }
            case command.on === "message":
              whats = new AllMessage(conn, msg);
              command.function(whats, msg, conn, m);
              break;
            default:
              break;
          }
        });
      });


      return conn;
    } catch (error) {
      console.log(error);
    }
    return;
  };
try {
	await getSession(config.SESSION_ID);
        Xasena();
} catch (error) {
	console.log("Encountered Error", error)
}
};

module.exports = connect;
