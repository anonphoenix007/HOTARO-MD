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


const { command, isPrivate } = require("../lib/");
const { isAdmins, formatp, parsedJid } = require("../lib");
const config = require("../config");
const os = require("os")


command({
            pattern: "tag",
            fromMe: true,
            desc: "Tags everyperson of group without mentioning their numbers",
            type: 'group'
        },
        async(message, match, m, client) => {
            if (!message.isGroup) return message.reply("This is a group command");
            const groupMetadata = message.isGroup ? await message.client.groupMetadata(message.jid).catch((e) => {}) : "";
            const participants = message.isGroup ? await groupMetadata.participants : "";
		await message.client.sendMessage(message.jid, {
                text: match ? match : "",
                mentions: participants.map((a) => a.id),
            }, {
                quoted: message,
            });
        }
    )

command({
        pattern: "tagall",
	fromMe: true,
        desc: "Tags every person of group.",
        type: "group"
    },
    async(message, match, m, client) => { 
	if (!message.isGroup) return message.reply("This is a group command");                                                                               
	const groupMetadata = message.isGroup ? await message.client.groupMetadata(message.jid).catch((e) => {}) : "";
        const participants = message.isGroup ? await groupMetadata.participants : "";
        let textt = `
_*ʜᴏᴛᴀʀᴏ-ᴍᴅ Tagall\n*_
*Message :* ${match? match : "blank"}\n\n
`
        for (let mem of participants) {
            textt += `❤️🌊 @${mem.id.split("@")[0]}\n`;
        }
        await message.client.sendMessage(message.jid, {
            text: textt,
            mentions: participants.map((a) => a.id),
        }, {
            quoted: message,
        });
    }
)

command(
  {
    pattern: "add",
    fromMe: true,
    desc: "add a person to group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This command is for groups only._");
    let tobe;
    if (match) {
    tobe = match 
    } else {
    tobe = message.reply_message.jid;
    }
    if (!match || message.reply_message) return await message.reply("_Mention or provide a number or reply to a user  to add");
    const isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_Make me admin to use this command 😌📍_");
    const jid = parsedJid(tobe);
    await message.client.groupParticipantsUpdate(message.jid, jid, "add");
    return await message.reply(`_@${jid[0].split("@")[0]} added_`, {
      mentions: [jid],
    });
  }
);

command(
  {
    pattern: "kick",
    fromMe: true,
    desc: "kicks a person from group",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups only._");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to kick_");
    const isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_Make me admin to use this command 😌📍_");
    const jid = parsedJid(match);
    await message.client.groupParticipantsUpdate(message.jid, jid, "remove");
    return await message.reply(`_@${jid[0].split("@")[0]} kicked_`, {
      mentions: [jid],
    });
  }
);

command(
  {
    pattern: "promote",
    fromMe: true,
    desc: "promote to admin",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to promote_");
    const isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_Make me admin to use this command 😌📍_");
    const jid = parsedJid(match);
    await message.client.groupParticipantsUpdate(message.jid, jid, "promote");
    return await message.reply(`_@${jid[0].split("@")[0]} promoted as admin_`, {
      mentions: [jid],
    });
  }
);
command(
  {
    pattern: "demote",
    fromMe: true,
    desc: "demote from admin",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to demote_");
    const isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_Make me admin to use this command 😌📍_");
    const jid = parsedJid(match);
    await message.client.groupParticipantsUpdate(message.jid, jid, "demote");
    return await message.reply(
      `_@${jid[0].split("@")[0]} demoted from admin_`,
      {
        mentions: [jid],
      }
    );
  }
);

command(
  {
    pattern: "mute",
    fromMe: true,
    desc: "nute group",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");
    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("_Make me admin to use this command 😌📍_");
    await message.reply(`_Group chat muted_\n\n> ʜᴏᴛᴀʀᴏ-ᴍᴅ `);
    return await message.client.groupSettingUpdate(message.jid, "announcement");
  }
);

command(
  {
    pattern: "unmute",
    fromMe: true,
    desc: "unmute group",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");
    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("_Make me admin to use this command 😌📍_");
    await message.reply(`_Group chat unmuted_\n\n> ʜᴏᴛᴀʀᴏ-ᴍᴅ `);
    return await message.client.groupSettingUpdate(message.jid, "not_announcement");
  }
);

command(
  {
    pattern: "gjid",
    fromMe: true,
    desc: "gets jid of all group members",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups only._");
    let { participants } = await client.groupMetadata(message.jid);
    let participant = participants.map((u) => u.id);
    let str = "╭──〔 *Participants Jid* 〕\n";
    participant.forEach((result) => {
      str += `┃ ➫ *${result}*\n`;
    });
    str += `╰──────────────`;
    message.reply(str);
  }
);

    //---------------------------------------------------------------------------

command({
    pattern: 'join ?(.*)',
    fromMe: true,
    use: 'group'
}, async (message, match, m, client) => {
    if (!match) return await message.reply("*provide a group link*");
    try {
    let gclink = match.split("chat.whatsapp.com")[1]
    await message.client.groupAcceptInvite(gclink)
    await message.reply("Group should be joined or wait for request to be accepted")
    } catch (error) {
    return message.reply(error)
    }
}); 

command(
{
	pattern: 'invite ?(.*)',
	fromMe: true,
	desc: "Provides the group's invitation link.",
	type: 'group'
}, async (message, match, m, client) => {
	if (!message.isGroup) return await message.reply('_This command is only for group chats_')
	if (!isAdmin) return await message.reply("I'm not an admin")
	const response = await message.client.groupInviteCode(message.jid)
	await message.reply(` Requested group link 🔗 \n\nhttps://chat.whatsapp.com/${response}`)
})

command(
{
	pattern: 'inviteuser ?(.*)',
	fromMe: true,
	desc: "Provides the group's invitation link.",
	type: 'group'
}, async (message, match, m, client) => {
	if (!message.isGroup) return await message.reply('_This command is only for group chats_')
	if (!isAdmin) return await message.reply("I'm not an admin")
	if (!match) return message.reply("Provide A number to send group link to")
	let tobe = match.replace(/[^0-9]/g, "")
	const response = await message.client.groupInviteCode(message.jid)
	await message.sendMessage(parsedJid(tobe)` Requested group link 🔗 \n\nhttps://chat.whatsapp.com/${response}`)
})


command(
{
    pattern: 'left',
    fromMe: true,
    desc: "Leave GC",
    type: "group"
}, async (message, match, m, client) => {
    if (!message.isGroup) return message.reply("_Dumbo,left is a group command,lol!_")
    if (!match) return message.reply("Use .left yes/okay to confirm")
    await message.reply("Group left successfully")
    return await message.client.groupLeave(message.jid);
})

command(
{
  pattern: "requests",
  fromMe: true,
  desc: "List all group join requests",
  type: "group",
}, async (message, match, m, client) => {
  try {
    if (!message.isGroup) return message.reply("This is a Group command.");
    if (!isAdmin) return await message.reply("I'm Not Admin In This Group,promote me to use the command!")
    const requests = await message.client.groupRequestParticipantsList(message.jid);
    if (!requests || requests.length === 0) {
      return await message.reply("No Join Requests Yet.");
    }
    let requestList = "*List of User that requested to join*\n\n";
    for (const request of requests) {
      requestList += `★ @${request.jid.split("@")[0]}\n`;
    }
    return await message.reply(requestList, { mentions: requests.map(r => r.jid) });
  } catch (error) {
    await console.error(`${error}\n\ncommand: requests`, error);
  }
});

command(
{
  cmdname: "acceptall",
  fromMe: true,
  desc: "Accept all requests to join!",
  type: "group"
}, async (message, match, m, client) => {
  try {
    if (!message.isGroup) return message.reply(`This command is for group chats only`)
    if (!isAdmin) return await message.reply(`I need to be admin to use this command`)
    const requests = await message.client.groupRequestParticipantsList(message.jid);
    if (!requests || requests.length === 0) { return await message.reply("No One Send Join Requests Yet.")}
    let acceptedList = "*List of accepted users*\n\n";
    for (const request of requests) {
      try {
        await message.client.groupRequestParticipantsUpdate(message.from, [request.jid], "approve");
        acceptedList += `★ @${request.jid.split("@")[0]}\n`;
      } catch (error) {
      }
    }
    await message.reply(acceptedList, { mentions: requests.map(r => r.jid) });
  } catch (error) {
    await console.error(`${error}\n\ncommand: acceptall`, error);
  }
});

command(
{
  cmdname: "rejectall",
  fromMe: true,
  desc: "Reject all users requests to join!",
  type: "group"
}, async (message, match, m, client) => {
try {
    if (!message.isGroup) return message.reply(`This command is for group chats only`)
    if (!isAdmin) { return await message.reply(`I need to be admin to use this command`)}
    const requests = await message.client.groupRequestParticipantsList(message.jid);
    if (!requests || requests.length === 0) { return await message.reply("*No One Send Join Requests Yet.*")}
    let rejectedList = "*List of rejected users*\n\n";
    for (const request of requests) {
      try {
         await message.client.groupRequestParticipantsUpdate(message.from, [request.jid], "reject");
         rejectedList += `➫ @${request.jid.split("@")[0]}\n`;
      } catch (error) {
        // handle individual rejection error silently
      }
    }

    await message.reply(rejectedList, { mentions: requests.map(r => r.jid) });
  } catch (error) {
    await console.error(`${error}\n\ncommand: rejectall`, error);
  }
});
command(
{
	on: "alink",
	fromMe: false,
	desc: "alink listener"
}, async (message, match) => {
if (config.ANTI_LINK === "on") {
if (/\bhttps?:\/\/\S+/gi.test(message.message)){
        var antilinkWarn = process.env.ANTI_LINK_ACTION?.split(',') || []
        if (antilinkWarn.includes(message.jid)) return;
        let linksInMsg = message.message.match(/\bhttps?:\/\/\S+/gi)
        if (isAdmin) {
        var usr = message.sender.includes(":") ? message.sender.split(":")[0]+"@s.whatsapp.net" : message.sender
        if (config.ANTI_LINK_ACTION === "delete") { await message.sendMessage(message.jid, { delete: message.data.key })
        await message.reply("_Link is not allowed!_")};
        if (config.ANTI_LINK_ACTION === "kick" ) { await message.client.groupParticipantsUpdate(message.jid, [usr], "remove");
	await message.reply("_Link is not allowed here_")}
} else return
}}});



const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
      const uptimeInSeconds = Math.floor(process.uptime());
      const uptimeFormatted = formatTime(uptimeInSeconds);
      const randomTime = Math.floor(Math.random() * 300000) + 1000;

command({ 
    on: "about"
   }, async (message, match, m, client) => {
   let text = `☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬, By:Tᴀɪʀᴀ Mᴀᴋɪɴᴏ, Alive:${uptimeFormatted}, RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}`
   await message.client.updateProfileStatus(text, randomTime)
});
