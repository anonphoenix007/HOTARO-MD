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
            //---------------------------------------------------------------------------
        command({
                    pattern: "blush",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
        
                    var bite = await getJson(`https://api.waifu.pics/sfw/blush`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid; 
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} blushed to @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} blushed to everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "punch",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
        
                    var bite = await getJson(`https://api.waifu.pics/sfw/kick`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} punched to @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} punched everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "pat",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
        
                    var bite = await getJson(`https://api.waifu.pics/sfw/pat`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} patted with @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} patted with everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "kiss",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
        
                    var bite = await getJson(`https://api.waifu.pics/sfw/kiss`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} kissed to @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} kissed with everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "kill",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
                    var bite = await getJson(`https://api.waifu.pics/sfw/kill`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} killed @${users.split("@")[0]}. `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} killed everyone over here. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "happy",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
                    var bite = await getJson(`https://api.waifu.pics/sfw/dance`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} felt happy with @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} felt happy with everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "dance",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
        
                    var bite = await getJson(`https://api.waifu.pics/sfw/dance`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} danced with @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} danced with everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "yeet",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
        
                    var bite = await getJson(`https://api.waifu.pics/sfw/yeet`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} yeeted to @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} yeeted with everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "wink",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
        
                    var bite = await getJson(`https://api.waifu.pics/sfw/wink`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} winked with @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} winked with everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "slap",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
        
                    var bite = await getJson(`https://api.waifu.pics/sfw/slap`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} slapped @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} slapped to everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "bonk",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
                    var bite = await getJson(`https://api.waifu.pics/sfw/bonk`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} bonked to @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} bonked to everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "bully",
                    fromMe: isPrivate,
                    type: "reaction"
                },
                async(message, match, m, client) => {
        
                    var bite = await getJson(`https://api.waifu.pics/sfw/bully`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} bullied to @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} bullied to everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                    pattern: "cringe",
                    fromMe: isPrivate,
                    type: "reaction"
                }, async(message, match, m, client) => {
                    var bite = await getJson(`https://api.waifu.pics/sfw/cringe`);
                    const response = await axios.get(bite.url, {
                        responseType: "arraybuffer",
                    });
                    const buffer = Buffer.from(response.data, "utf-8");
                    let users = match || message.reply_message.jid;
                    let gif = await GIFBufferToVideoBuffer(buffer);
                    if (users) {
                        let cap = `@${message.sender.split("@")[0]} cringed at @${users.split("@")[0]} `;
                        message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                    } else {
                        let cap = `@${message.sender.split("@")[0]} cringed with everyone. `;
                        message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                    }
                }
            )
            //---------------------------------------------------------------------------
        command({
                pattern: "cuddle",
                fromMe: isPrivate,
                type: "reaction"
            },  async(message, match, m, client) => {
                var bite = await getJson(`https://api.waifu.pics/sfw/cuddle`);
                const response = await axios.get(bite.url, {
                    responseType: "arraybuffer",
                });
                const buffer = Buffer.from(response.data, "utf-8");
                let users = match || message.reply_message.jid;
                let gif = await GIFBufferToVideoBuffer(buffer);
                if (users) {
                    let cap = `@${message.sender.split("@")[0]} cuddled with @${users.split("@")[0]} `;
                    message.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [users, message.sender], caption: cap }, { quoted: message });
                } else {
                    let cap = `@${message.sender.split("@")[0]} cuddled with everyone. `;
                    message.client.sendMessage(message.jid, { video: gif, gifPlayback: true, mentions: [message.sender], caption: cap }, { quoted: message });
                }
            }
        )
