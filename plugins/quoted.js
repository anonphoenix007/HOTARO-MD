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


const { command, isPrivate, serialize } = require("../lib/");
const { loadMessage } = require("../database/StoreDb");

command(
  {
    pattern: "quoted",
    fromMe: isPrivate,
    desc: "quoted message",
    type: 'user'
  }, async (message, match) => {
    if (!message.reply_message)
      return await message.reply("*Reply to a message*");
    let key = message.reply_message.key;
    let msg = await loadMessage(key.id);
    if (!msg)
      return await message.reply(
        "_Message not found maybe bot might not be running at that time_"
      );
    msg = await serialize(
      JSON.parse(JSON.stringify(msg.message)),
      message.client
    );
    if (!msg.quoted) return await message.reply("No quoted message found");
    await message.forward(message.jid, msg.quoted.message);
  }
);
