const googleTTS = require("google-tts-api");
const { command, isPrivate, serialize, parsedJid, getBuffer } = require("../lib")
const axios = require("axios")
const util = require("util")
const fs = require("fs")


command({ 
        pattern: "tts", 
        fromMe: isPrivate, 
        desc: "text to speech.", 
        type: "media"
  }, async(message, match, m, client) => { 
    if (!match) return message.reply('Please give me a Sentence to change into audio.')
            let texttts = match
            const ttsurl = googleTTS.getAudioUrl(texttts, { lang: "en", slow: false, host: "https://translate.google.com" });
            return await message.client.sendMessage(message.jid, { audio: { url: ttsurl }, mimetype: "audio/mpeg", fileName: `hotarotts.m4a`}, { quoted: message })
            await fs.unlinkSync("./hotarotts.m4a");
        }
    );

command({ 
            pattern: "wa",
            fromMe: isPrivate, 
            desc: "Makes wa.me of quoted or mentioned user.",
            type: "tools"
    }, async(message, match) => { 
    //let users = match || message.reply_message.jid
    if (match) {
      let emp = match.replace(/[^0-9]/g, "")
      await message.reply(`Here you go\n\thttps://wa.me/${emp}`)
    } else {
    let jid = message.reply_message.jid.split("@")[0]
    return message.reply(`https://wa.me/${jid}`)
}
    });

command({ 
        pattern: "repo", 
        fromMe: isPrivate, 
        desc: "Sends info about repo.", 
        type: "user",
    }, async(message, match, m, client) => { 
    let { data } = await axios.get('https://api.github.com/repos/Anonphoenix007/HOTARO-MD')
    let cap = `*_ʜᴏᴛᴀʀᴏ-ᴍᴅ, Simple to use WhatsApp Bot_*.
  *_❲❒❳ Stars: ${data.stargazers_count} stars_*
  *_❲❒❳ Forks: *${data.forks_count} forks_*
  *_❲❒❳ Creator: https://t.me/Tha_Healer_*
  *_❲❒❳ Group_: null*
  *_❲❒❳ Channel: https://whatsapp.com/channel/0029Vag5l2ALSmbi14YryJ2r_*
  *_❲❒❳ Repo: https://github.com/anonphoenix007/HOTARO-MD_*
  *_❲❒❳ Scan: https://ttech-web-server.onrender.com_*
  *> ©Tᴀɪʀᴀ Mᴀᴋɪɴᴏ*`
      
  let buff = await getBuffer("https://telegra.ph/file/0691935a017b74bc2e49b.jpg");
    await message.client.sendMessage(message.jid, {
      'image': buff,
      'mimetype': "image/jpeg",
      'caption': cap,
      'contextInfo': {
        'externalAdReply': {
          'title': "ʜᴏᴛᴀʀᴏ-ᴍᴅ",
          'body': "Repo stat",
          'sourceUrl': "",
          'mediaUrl': "",
          'mediaType': 3,
          'showAdAttribution': true,
          'renderLargerThumbnail': false,
          'thumbnailUrl': "https://telegra.ph/file/0691935a017b74bc2e49b.jpg"
        }
      }
    });
    }
)

command(
  { 
    on: "evall" 
  }, async (message, match) => {
  try {
    if (message.sudo && message.body.startsWith('>')) { 
      let code = match.slice(2) 
      if (!code) {
        await message.reply(`You need to provide a query to run!`);
        return;
        }
      let resultTest = eval(match);
      if (typeof resultTest === "object") {
        message.reply(util.format(resultTest)); 
        } else {
            message.reply(util.format(resultTest));
            }}
    if (message.sudo && message.body.startsWith('$')) {
      let code = match.slice(2)
      if (!code) {
        await message.reply(`You need to provide a query to run!`); 
        return;
        }
      let resultTest = await eval('const a = async()=>{\n' + code + '\n}\na()');
      let h = util.format(resultTest);
      if(h===undefined) { return console.log(h) } 
        else {
            await message.reply(h)}
             }
    } catch (err) {
      console.log(err)
      await message.reply(util.format(err));
    }
  }
) 
