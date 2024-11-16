const { command, isPrivate, serialize } = require("../lib");
const fs = require("fs");
const { download } = require('aptoide-scraper'); 

command(
{
   pattern: "apk",
   fromMe: isPrivate,
   desc: "apk and mod apk download",
   use: "media"
}, async(message, match, m, client) => {   
      if (!match) return message.reply('*Please provide the APK Name to download.*')
      await message.sendMessage(message.jid, {text: `*Downloading ${match}*`})
      let data = await download(match);
      if (data.size.replace(' MB', '') > 200) {
        return await mesage.sendMessage(message.jid, { text: '*The file is too large,Cannot send.*' }, { quoted: message });
      }
      if (data.size.includes('GB')) {
        return await message.sendMessage(message.jid, { text: '*The file is too large,cannot send..*' }, { quoted: message });
      } 
      await message.client.sendMessage(
        message.jid,
        { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.apk', caption: null },
        { quoted: message }
      )
});
