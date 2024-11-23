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


const { command, isAdmin, parsedJid } = require("../lib");
const { exec } = require("child_process");
const { PausedChats, WarnDB } = require("../database");
const { WARN_COUNT, PRESENCE } = require("../config");
const { secondsToDHMS } = require("../lib/functions");
const { saveWarn, resetWarn } = WarnDB;
const { isPrivate } = require("../lib");
const config = require("../config")
const Jimp = require("jimp");

async function updateProfilePicture(jid, imag, message) {
  const { query } = message.client;
  const { img } = await generateProfilePicture(imag);
  await query({
    tag: "iq",
    attrs: {
      to: jid,
      type: "set",
      xmlns: "w:profile:picture",
    },
    content: [
      {
        tag: "picture",
        attrs: { type: "image" },
        content: img,
      },
    ],
  });
}

async function generateProfilePicture(buffer) {
  const jimp = await Jimp.read(buffer);
  const min = jimp.getWidth();
  const max = jimp.getHeight();
  const cropped = jimp.crop(0, 0, min, max);
  return {
    img: await cropped.scaleToFit(324, 720).getBufferAsync(Jimp.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG),
  };
}

command(
  {
    pattern: "fullpp",
    fromMe: true,
    desc: "Set full profile picture",
    type: "user",
  },
  async (message, match,m) => {
    if (!message.reply_message.image)
      return await message.reply("_You need to Reply to a photo_");
    let media = await m.quoted.download();
    await updateProfilePicture(message.user, media, message);
    return await message.reply("_Profile Picture Successfully Updated_");
  }
);


command(
 { 
  on: "text" 
 }, async (message, match, m, client) => {
  try {
      message.client.sendPresenceUpdate(PRESENCE, message.jid);
  } catch (e) {
    console.log(e);
  }
});




command(
  {
    pattern: "shutdown",
    fromMe: true,
    desc: "stops the bot",
    type: "user",
  },
  async (message, match) => {
    await message.sendMessage(message.jid, "shutting down...");
    exec("pm2 stop HOTARO-MD", (error, stdout, stderr) => {
      if (error) {
        return message.sendMessage(message.jid, `Error: ${error}`);
      }
      return;
    });
  }
);


command(
  {
    pattern: "setpp",
    fromMe: true,
    desc: "Set profile picture",
    type: "user",
  },
  async (message, match, m, client) => {
    if (!message.reply_message.image) await message.reply("_Reply to a photo_");
    let buff = await m.quoted.download();
    await message.client.updateProfilePicture(message.client.user.id, buff);
    return await message.reply("_Profile Picture Updated_");
  }
);

command(
  {
    pattern: "rpp",
    fromMe: true,
    desc: "remove profile picture",
    type: "user",
  },
  async (message, match, m, client) => {
    await message.client.removeProfilePicture(message.client.user.id);
    return await message.reply("_Profile Picture removed_");
  }
);


command(
  {
    pattern: "setname",
    fromMe: true,
    desc: "Set User name",
    type: "user",
  },
  async (message, match, m, client) => {
    if (!match) return await message.reply("_Enter a name_");
    await message.client.updateProfileName(match);
    return await message.reply(`_Username Updated : ${match}_`);
  }
);

command(
  {
    pattern: "block",
    fromMe: true,
    desc: "Block a person",
    type: "user",
  },
  async (message, match, m, client) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.client.updateBlockStatus(jid, 'block');
      return await message.sendMessage(`_@${jid.split("@")[0]} Blocked_`, {
        mentions: [jid],
      });
    } else {
      await message.client.updateBlockStatus(message.jid, 'block');
      return await message.reply("_User Successfully blocked_");
    }
  }
);

command(
  {
    pattern: "unblock",
    fromMe: true,
    desc: "Unblock a person",
    type: "user",
  },
  async (message, match, m, client) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.client.updateBlockStatus(jid, 'unblock');
      return await message.sendMessage(
        message.jid,
        `_@${jid.split("@")[0]} Successfully unblocked_`,
        {
          mentions: [jid],
        }
      );
    } else {
      await message.client.updateBlockStatus(message.jid, 'unblock');
      return await message.reply("_User Successfully unblocked_");
    }
  }
);

command(
  {
    pattern: "jid",
    fromMe: isPrivate,
    desc: "Give jid of chat/user",
    type: "user",
  },
  async (message, match) => {
    return await message.sendMessage(
      message.jid,
      message.mention[0] || message.reply_message.jid || message.jid
    );
  }
);

command(
  {
    pattern: "del",
    fromMe: true,
    desc: "deletes a message",
    type: "user",
  },
  async (message, match, m, client) => {
    if (message.isGroup) {
      message.client.sendMessage(message.jid, { delete: message.reply_message.key });
    }
  }
);

command(
  {
    pattern: "warn",
    fromMe: true,
    desc: "Warn a user",
  },
  async (message, match) => {
    const userId = message.mention[0] || message.reply_message.jid;
    if (!userId) return message.reply("_Mention or reply to someone_");
    let reason = message?.reply_message.text || match;
    reason = reason.replace(/@(\d+)/, "");
    reason = reason ? reason.length <= 1 : "Reason not Provided";

    const warnInfo = await saveWarn(userId, reason);
    let userWarnCount = warnInfo ? warnInfo.warnCount : 0;
    userWarnCount++;
    await message.reply(
      `_User @${
        userId.split("@")[0]
      } warned._ \n_Warn Count: ${userWarnCount}._ \n_Reason: ${reason}_`,
      { mentions: [userId] }
    );
    if (userWarnCount > WARN_COUNT) {
      const jid = parsedJid(userId);
      await message.sendMessage(
        message.jid,
        "Warn limit exceeded kicking user"
      );
      return await message.client.groupParticipantsUpdate(
        message.jid,
        jid,
        "remove"
      );
    }
    return;
  }
);

command(
  {
    pattern: "resetwarn",
    fromMe: true,
    desc: "Reset warnings for a user",
  },
  async (message) => {
    const userId = message.mention[0] || message.reply_message.jid;
    if (!userId) return message.reply("_Mention or reply to someone_");
    await resetWarn(userId);
    return await message.reply(
      `_Warnings for @${userId.split("@")[0]} reset_\n\n☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬`,
      {
        mentions: [userId],
      }
    );
  }
);

command(
  {
    pattern: "uptime",
    fromMe: isPrivate,
    desc: "Check uptime of bot",
    type: "user",
  },
  async (message, match) => {
    message.reply(`*Uptime:* ${secondsToDHMS(process.uptime())}\n\n☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬`);
  }
);



command(
  {
    pattern: "ss ?(.*)",
    fromMe: true,
    desc: "Screenshots a site",
    type: "misc",
  },
  async (message, match) => {
    if (!match) {
      return await message.sendMessage("*Please provide a URL to screenshot.*");
    }

    const screenshotUrl = `https://api.giftedtech.my.id/api/tools/vurl?apikey=gifted&url=${encodeURIComponent(match)}`;

    await message.client.sendMessage(
      message.jid,
      {
        image: { url: screenshotUrl },
        mimetype: "image/jpeg",
        caption: `\n> screenshot of ${(match)} generated successfully `,
      },
      { quoted: message }
    );
  }
);
