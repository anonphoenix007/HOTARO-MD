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


const {
  command,
  qrcode,
  Bitly,
  isPrivate,
  isUrl,
  readQr,
} = require("../lib/");

const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const { getLyrics } = require("../lib/functions");
const config = require("../config");

command(
  {
    pattern: "clearchat",
    fromMe: true,
    desc: "dltcht",
    type: "tools",
  }, async(message, match, m, client) => {
     client.chatModify({ delete: true, lastMessages: [{ key: message.key, messageTimestamp: message.messageTimestamp }] }, message.jid)
     let a = await message.reply("Successfully deleted this chat!") 
  })
	  
command(
  {
    pattern: "vv",
    fromMe: true,
    desc: "Forwards The View once messsage",
    type: "tools",
  },
  async (message, match, m) => {
    let buff = await m.quoted.download();
    return await message.sendFile(buff);
  }
);

command(
{
    pattern: 'vv2 ?(.*)',
    fromMe: true,
    desc: "Anti view once",
    use: 'tool'
}, (async (m, t, client) => {
    if (!m.reply_message || (!m.quoted?.message.hasOwnProperty('viewOnceMessage') &&  !m.quoted?.message.hasOwnProperty('viewOnceMessageV2'))) return await m.reply("_Reply a view once msg!_")
    m.quoted.message = m.quoted.message.viewOnceMessage?.message || m.quoted.message.viewOnceMessageV2?.message;
    m.quoted.message[Object.keys(m.quoted.message)[0]].viewOnce = false
    await m.forwardMessage(client.user.id, m.quoted)
    }));
// STATUS SAVER ( MAKE fromMe: false TO USE AS PUBLIC )
command(
  {
    on: "text",
    fromMe: false,
    desc: "Save or Give Status Updates",
    dontAddCommandList: true,
    type: "Tools",
  },
  async (message, match, m) => {
    try {
      if (message.isGroup) return;
      const triggerKeywords = ["save", "send", "sent", "snt", "give", "snd"];
      const cmdz = match.toLowerCase().split(" ")[0];
      if (triggerKeywords.some((tr) => cmdz.includes(tr))) {
        const relayOptions = { messageId: m.quoted.key.id };
        return await message.client.relayMessage(
          message.jid,
          m.quoted.message,
          relayOptions
        );
      }
    } catch (error) {
      console.error("[Error]:", error);
    }
  }
);

command(
  {
    pattern: "qr",
    fromMe: isPrivate,
    desc: "Read/Write Qr.",
    type: "Tools",
  },
  async (message, match, m) => {
    match = match || message.reply_message.text;

    if (match) {
      let buff = await qrcode(match);
      return await message.sendMessage(message.jid, buff, {}, "image");
    } else if (message.reply_message.image) {
      const buffer = await m.quoted.download();
      readQr(buffer)
        .then(async (data) => {
          return await message.sendMessage(message.jid, data);
        })
        .catch(async (error) => {
          console.error("Error:", error.message);
          return await message.sendMessage(message.jid, error.message);
        });
    } else {
      return await message.sendMessage(
        message.jid,
        "*Example : qr test*\n*Reply to a qr image.*"
      );
    }
  }
);

command(
  {
    pattern: "bitly",
    fromMe: isPrivate,
    desc: "Converts Url to bitly",
    type: "tools",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("_Reply to a url or enter a url_");
    if (!isUrl(match)) return await message.reply("_This Is Not a url_");
    let short = await Bitly(match);
    return await message.reply(short.link);
  }
);

command(
{
	pattern: 'readmore ?(.*)',
	fromMe: isPrivate,
	desc: 'Readmore generator',
	type: 'whatsapp'
}, async (message, match, m) => {
	if (!match) { return message.reply(`Quote a message`)};
	await message.reply(m.replace(/\+/g, (String.fromCharCode(8206)).repeat(4001)))
});

command(
{
	pattern: 'archive$',
	fromMe: true,
	desc: 'archive whatsapp chat',
	type: 'whatsapp'
}, async (message, match, m, client) => {
	await client.chatModify(message.jid, { archive: true })
	await message.reply('_Chat Archived_')
})

command(
{
	pattern: 'unarchive$',
	fromMe: true,
	desc: 'unarchive whatsapp chat',
	type: 'whatsapp'
}, async (message, match, m, client) => {
	await client.chatModify(message.jid, { arcbive: false })
	await message.reply('_Chat Unarchived_')
})
command(
{
	pattern: 'pin',
	fromMe: true,
	desc: 'pin whatsapp chat',
	type: 'whatsapp'
}, async (message, match, m, client) => {
	await client.chatModify({ pin: true, }, message.jid );
	await message.reply("Chat Pinned");
})
command(
{
	pattern: 'unpin',
	fromMe: true,
	desc: 'unpin whatsapp chat',
	type: 'whatsapp'
}, async (message, match, m, client) => {
	await client.chatModify({ pin: false, }, message.jid );
	await message.reply("Chat unpinned");
})
