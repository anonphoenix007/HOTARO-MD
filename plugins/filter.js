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


const { getFilter, setFilter, deleteFilter } = require("../database/filters");
const { command} = require("../lib");

command(
  {
    pattern: "afilter",
    fromMe: true,
    desc: "Adds a filter. When someone triggers the filter, it sends the corresponding response. To view your filter list, use `.afilter`.",
    usage: ".afilter keyword:message",
    type: "group",
  },
  async (message, match) => {
    let text, msg;
    try {
      [text, msg] = match.split(":");
    } catch {}
    if (!match) {
      filtreler = await getFilter(message.jid);
      if (filtreler === false) {
        await message.reply("No filters are currently set in this chat.");
      } else {
        var mesaj = "Your active filters for this chat:" + "\n\n";
        filtreler.map(
          (filter) => (mesaj += `✒ ${filter.dataValues.pattern}\n`)
        );
        mesaj += "use : .afilter keyword:message\nto set a filter";
        await message.reply(mesaj);
      }
    } else if (!text || !msg) {
      return await message.reply(
        "```use : .afilter keyword:message\nto set a filter```"
      );
    } else {
      await setFilter(message.jid, text, msg, true);
      return await message.reply(`_Sucessfully set filter for ${text}_`);
    }
  }
);

command(
  {
    pattern: "sfilter",
    fromMe: true,
    desc: "Stops a previously added filter.",
    usage: '.sfilter "hello"',
    type: "group",
  },
  async (message, match) => {
    if (!match) return await message.reply("\n*Example:* ```.sfilter hello```");

    del = await deleteFilter(message.jid, match);
    await message.reply(`_Filter ${match} deleted_`);

    if (!del) {
      await message.reply("No existing filter matches the provided input.");
    }
  }
);

command(
  { on: "text", fromMe: true, dontAddCommandList: true },
  async (message, match) => {
    var filtreler = await getFilter(message.jid);
    if (!filtreler) return;
    filtreler.map(async (filter) => {
      pattern = new RegExp(
        filter.dataValues.regex
          ? filter.dataValues.pattern
          : "\\b(" + filter.dataValues.pattern + ")\\b",
        "gm"
      );
      if (pattern.test(match)) {
      return  await message.reply(filter.dataValues.text, {
          quoted: message,
        });
      }
    });
  }
);
