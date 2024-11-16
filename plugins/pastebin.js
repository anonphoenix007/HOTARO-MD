
const { command, isPrivate, serialize } = require("../lib");
const PastebinAPI = require("pastebin-js");
pastebin = new PastebinAPI("EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL");

command({
        pattern: "pastebin",
        fromMe: isPrivate,
        desc: "To check ping",
        type: "tools",
    }, async(message, match, m) => {
        if(!m.quoted) return message.reply('Please quote any text to get link.')
        let data = await pastebin.createPaste(m.quoted.text, "Secktor-Pastebin")
        message.reply('_Here is your link._\n'+data)
    }
);

command(
  {
    pattern: "$",
    type: "tools",
    fromMe: true,
    desc: "Runs js code on node server."
    //dontAddCommandList: true,
  },
  async (message, match, m) => {
    try {
      if (!match) {
        return message.reply("*Provide A Query.");
      }
      let evaled = eval("const a = async()=>{\n" + match + "\n}\na()");
      if (typeof evaled === "object") {
        await message.reply(JSON.stringify(evaled));
      } else {
        await _0x5a9ab6.reply(evaled.toString());
      }
    } catch (error) {
      return await message.reply(_error.toString());
    }
  }
);
