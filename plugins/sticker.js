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


const config = require("../config");
const { command, isPrivate, toAudio } = require("../lib/");
const { webp2mp4, textToImg } = require("../lib/functions");
command(
  {
    pattern: "sticker",
    fromMe: isPrivate,
    desc: "Converts Photo/video/text to sticker",
    type: "converter",
  },
  async (message, match, m) => {
    const isValid =
      message.reply_message.video ||
      message.reply_message.image ||
      message.reply_message.text ||
      message.reply_message.mimetype.includes("image");

    if (isValid) return await message.reply("_Reply to photo/video/text_");
    if (message.reply_message.text) {
      let buff = await textToImg(message.reply_message.text);
      return await message.sendMessage(
        message.jid,
        buff,
        { mimetype: "image/webp" },
        "stickerMessage"
      );
    }
    let buff = await m.quoted.download();
    message.sendMessage(
      message.jid,
      buff,
      { packname: '☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬', author: config.AUTHOR },
      "sticker"
    );
  }
);

command(
  {
    pattern: "take",
    fromMe: isPrivate,
    desc: "Converts Photo or video to sticker",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message.sticker)
      return await message.reply("_Reply to a sticker_");
    const packname = match.split(";")[0] || '☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬';
    const author = match.split(";")[1] || config.AUTHOR;
    let buff = await m.quoted.download();
    message.sendMessage(message.jid, buff, { packname, author }, "sticker");
  }
);

command(
  {
    pattern: "photo",
    fromMe: isPrivate,
    desc: "Changes sticker to Photo",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message.sticker)
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(message.jid, buff, {}, "image");
  }
);

command(
  {
    pattern: "mp3",
    fromMe: isPrivate,
    desc: "converts video/voice to mp3",
    type: "media",
  },
  async (message, match, m) => {
    let buff = await m.quoted.download();
    console.log(typeof buff);
    buff = await toAudio(buff, "mp3");
    console.log(typeof buff);
    return await message.sendMessage(
      message.jid,
      buff,
      { mimetype: "audio/mpeg" },
      "audio"
    );
  }
);

command(
  {
    pattern: "mp4",
    fromMe: isPrivate,
    desc: "converts video/voice to mp4",
    type: "media",
  },
  async (message, match, m) => {
    if (
      !message.reply_message.video ||
      !message.reply_message.sticker ||
      !message.reply_message.audio
    )
      return await message.reply("_Reply to a sticker/audio/video_");
    let buff = await m.quoted.download();
    if (message.reply_message.sticker) {
      buff = await webp2mp4(buff);
    } else {
      buff = await toAudio(buff, "mp4");
    }
    return await message.sendMessage(
      message.jid,
      buff,
      { mimetype: "video/mp4" },
      "video"
    );
  }
);

command(
  {
    pattern: "img",
    fromMe: isPrivate,
    desc: "Converts Sticker to image",
    type: "media",
  },
  async (message, match, m) => {
    if (!message.reply_message.sticker)
      return await message.reply("_Reply to a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(message.jid, buff, {}, "image");
  }
);
