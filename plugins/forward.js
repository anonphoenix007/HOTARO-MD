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


const { command, parsedJid,isPrivate } = require("../lib/");

command(
  {
    pattern: "send",
    fromMe: true,
    desc: "Forwards the replied Message",
    type: "Util",
  },
  async (message, match, m) => {
    if(!m.quoted) return message.reply('you need to reply to something') 
    let jids = parsedJid(match);
    for (let i of jids) {
      await message.forward(i, message.reply_message.message);
    }   
  }
);

command(
  {
    pattern: "save",
    fromMe: true,
    desc: "Save the replied Message",
    type: "Util",
  },
  async (message, match, m) => {
    if(!m.quoted) return message.reply('you need to reply to something') 
    let lognum = this.client.user.id
      await message.forward(lognum, message.reply_message.message);   
  }
);
