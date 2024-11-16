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


const { ANTIDELETE } = require("../config");
const { command, isPrivate, serialize } = require("../lib");
const { loadMessage, getName } = require("../database/StoreDb");
command(
  {
    on: "svdelete",
    fromMe: false,
    desc: "Logs the recent deleted message",
  },
  async (message, match) => {
    if (!ANTIDELETE) return;
    let msg = await loadMessage(message.messageId);
    if (!msg) return;
    msg = await serialize(
      JSON.parse(JSON.stringify(msg.message)),
      message.client
    );
    if (!msg) return await message.reply("No deleted message found");
    let deleted = await message.forward(message.client.user.id, msg.message);
    var name;
    if (!msg.from.endsWith("@g.us")) {
      let getname = await getName(msg.from);
      name = `_Name : ${getname}_`;
    } else {
      let gname = (await message.client.groupMetadata(msg.from)).subject;
      let getname = await getName(msg.sender);
      name = `_Group : ${gname}_\n_Name : ${getname}_`;
    }
    return await message.sendMessage(message.client.user.id,
      `_Message Deleted_\n_From : ${msg.from}_\n${name}\n_SenderJid : ${msg.sender}_`,
      { quoted: deleted }
    );
  }
);
