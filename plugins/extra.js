const axios = require('axios')
 const { getJson,command, GIFBufferToVideoBuffer} = require('../lib')
 const { isPrivate, serialize } = require("../lib");
            //---------------------------------------------------------------------------
        command({
                    pattern: "bite",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
                    var bite = await getJson(`https://api.waifu.pics/sfw/bite`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} bitten to @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} bitten to everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
