const { command, formatp, getBuffer,isPrivate, clockString, pm2Uptime } = require("../lib"); 
const config = require("../config");
const process = require("process")
const { OWNER_NAME, BOT_NAME } = require("../config");
const { hostname } = require("os");
const plugins = require("../lib/plugins");
const os = require("os");
function runtime(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}


command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Menu",
    type: "user",
  },
  async (message, match, m, client) => {
      const prefix = config.HANDLERS;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Africa/Lagos" })
        .split(",");
      let heder = `
╭════════════════ ⪩
┃  〘 *☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬* 〙
╰════════════════ ⪨
╭════════════════ ⪩
┃   *Oᴡɴᴇʀ : ${OWNER_NAME}*
┃   *Time  : ${time}*
┃   *Dᴀᴛᴇ : ${date}*
┃   *Pʟᴜɢɪɴꜱ : ${plugins.commands.length}*
┃   *MODE : ${config.WORK_TYPE}*
┃   *Pʀᴇꜰɪx : ${prefix}*
┃   *Rᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
╰════════════════ ⪨
`;
    let buff = await getBuffer("https://telegra.ph/file/0691935a017b74bc2e49b.jpg");
    await message.client.sendMessage(message.jid, {
      'image': buff,
      'mimetype': "image/jpeg",
      'caption': heder,
      'contextInfo': {
        'externalAdReply': {
          'title': "ʜᴏᴛᴀʀᴏ-ᴍᴅ",
          'body': "Lightweight WhatsApp Bot.",
          'sourceUrl': "",
          'mediaUrl': "",
          'mediaType': 1,
          'showAdAttribution': true,
          'renderLargerThumbnail': false,
          'thumbnailUrl': "https://telegra.ph/file/0691935a017b74bc2e49b.jpg"
        }
      }
    });
  }
);

