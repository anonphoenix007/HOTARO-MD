const { command, getUrl, igdl, isIgUrl,isPrivate } = require("../lib/");
command(
  {
    pattern: "insta",
    fromMe: isPrivate,
    desc: "To download instagram media",
    type: "media",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.sendMessage(message.jid, "provide me an Instagram link");
    const url = getUrl(match.trim())[0];
    if (!url) return await message.sendMessage(message.jid, "The link provided is invalid.");
    if (!isIgUrl(url))
      return await message.sendMessage(message.jid, "Invalid Instagram link");
    if (!isIgUrl(match.trim()))
      return await message.sendMessage(message.jid, "Invalid Instagram link");
    try {
      const data = await igdl(getUrl(match.trim())[0]);
      if (data.length == 0)
        return await message.sendMessage(
          message.jid,
          "No media found on the link"
        );
      data.forEach(async (url) => {
        await message.sendFile(url);
      });
    } catch (e) {
      await message.sendMessage(message.jid, "Error: " + e);
    }
  }
);
