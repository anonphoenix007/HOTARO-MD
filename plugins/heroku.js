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


const got = require("got");
const Heroku = require("heroku-client");
const { command, isPrivate } = require("../lib/");
const Config = require("../config");
const heroku = new Heroku({ token: Config.HEROKU_API_KEY });
const baseURI = "/apps/" + Config.HEROKU_APP_NAME;
const { secondsToDHMS } = require("../lib/functions");
const { delay } = require("@whiskeysockets/baileys");
const isVPS = !(__dirname.startsWith("/HOTARO-MD") || __dirname.startsWith("/HOTARO-MD"));
const isHeroku = __dirname.startsWith("/HOTARO-MD");
const { update } = require("../lib/koyeb");
const config = require("../config");

async function fixHerokuAppName(message = false){
            if (!HEROKU.API_KEY && message) return await message.send
             eply(`_You have not provided HEROKU_API_KEY\n\nPlease fill the HEROKU-API-KEY vars or,get api key from heroku account settings_`)
            let apps = await heroku.get('/apps')
            let app_names = apps.map(e=>e.name)
            if (!HEROKU.APP_NAME || !app_names.includes(Config.HEROKU.APP_NAME)){
            function findGreatestNumber(e){let t=e[0];for(let n=1;n<e.length;n++)e[n]>t&&(t=e[n]);return t}
            let times = apps.map(e=>new Date(e.updated_at).getTime())
            let latest = findGreatestNumber(times)
            let index = times.indexOf(latest)
            let app_name = apps[index].name
            Config.HEROKU.APP_NAME = app_name
            process.env.HEROKU_APP_NAME = app_name
            baseURI = '/apps/' + app_name;
            if (message) await message.reply(`_You provided an incorrect heroku app name, and I have corrected your app name to "${app_name}"_\n\n_Please retry this command after restart!_`)    
            Config.HEROKU.APP_NAME = app_name
                return await setVar("HEROKU_APP_NAME",app_name,message)
            }
}

async function setVar(key,value,message = false){
        key = key.toUpperCase().trim()
        value = value.trim()
        let setvarAction = isHeroku ? "restarting" : isVPS ? "rebooting" : "redeploying";
        var set_ = `_⚙ Successfully set ${key} to ${value}, {}.._`;
        set_ = key == "ANTI_BOT" ? `AntiBot activated, bots will be automatically kicked, {}` : key == "ANTI_SPAM" ? `AntiSpam activated, spammers will be automatically kicked, {}` :key == "CHATBOT" ? `AI Chatbot turned ${value}, {}` : key == "MODE" ? `Mode switched to ${value}, {}`:set_;
        set_ = set_.format(setvarAction)
        let m = message;
        if (isHeroku) {
            await fixHerokuAppName(message)
            await heroku.patch(baseURI + '/config-vars', {
                body: {
                    [key]: value
                }
            }).then(async (app) => {
                if (message){
                return await message.reply(set_)
                }
            });
        }
if (isVPS){
        try { 
        var envFile = fs.readFileSync(`../config.env`,'utf-8')
        const lines = envFile.trim().split('\n');
        let found = false;
        for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith(`${key}=`)) {
            lines[i] = `${key}="${value}"`;
            found = true;
            break;
        }
        }
        if (!found) {
        lines.push(`${key}="${value}"`);
        }
fs.writeFileSync('../config.env', lines.join('\n'));
        if (message){
        await message.reply(set_)
        }
        if (key == "SESSION_ID"){
        await require('fs-extra').removeSync('../lib/auth_info_baileys'); 
        }
        process.exit(0)    
    } catch(e){
        if (message) return await message.reply("_Unable to set var._\n"+e.message);
        }
        } 
        if (__dirname.startsWith("/HOTARO-MD")) {
            let set_res = await update(key,value)
            if (set_res && message) return await message.reply(set_)
            else throw "Error!"
        }   
         }

command(
 {
  pattern: "mode",
  fromMe: "true",
  desc: "change mode",
  use: "heroku"
 }, async(message, match) => {
  if(!match) { return message.reply("use like .mode private/public")};
  if(match === "private") 
  process.env.WORK_TYPE="private"
  await message.reply("*HOTARO-MD WORKTYPE is now private*")
  if (match === "public"){
  process.env.WORK_TYPE="public"
  await message.reply("*HOTARO-MD WORKTYPE is now public*")
  }
  else {
  await message.reply("*You need to choose between private or public*")}
 });
command(
  {
    pattern: "restart",
    fromMe: true,
    type: "heroku",
    desc: "Restart Dyno",
  },
  async (message) => {
    await message.reply(`_☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬ is Restarting_`);
    if (Config.HEROKU) {
      if (Config.HEROKU_APP_NAME === "") {
        return await message.reply("Add `HEROKU_APP_NAME` env variable");
      }
      if (Config.HEROKU_API_KEY === "") {
        return await message.reply("Add `HEROKU_API_KEY` env variable");
      }
      await heroku.delete(baseURI + "/dynos").catch(async (error) => {
        await message.reply(`HEROKU : ${error.body.message}`);
      });
    } else {
      require("child_process").exec(
        "pm2 restart "+Config.PROCESSNAME,
        (error, stdout, stderr) => {
          if (error) {
            return message.sendMessage(message.jid, `Error: ${error}`);
          }
          return;
        }
      );
    }
  }
);
command(
  {
    pattern: "restart",
    fromMe: true,
    type: "heroku",
    desc: "Dyno off",
  },
  async (message) => {
          await message.reply(`_☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬ is shutting down/restarting._`);
          process.exit()
  }
);

command({
        pattern: 'setvar ?(.*)',
        fromMe: true,
        desc: "Set bot variables",
        type: 'heroku'
    }, async (message, match) => {
        match = match || message.reply_message.text
        var m = message;
        if (!match) return await message.reply("_Need a var!_\n_Usage: .setvar WORK_TYPE:public_")
        let [key, ...valueArr] = match.split(':');
        let value = valueArr.join(':');
        config[key] = value
        return await setVar(key,value,message)
        
    });

command(
 {
        pattern: 'delvar ?(.*)',
        fromMe: true,
        desc: "Delete a variable",
        type: 'heroku'
    }, async (message, match) => {
        if (!isHeroku) return await message.reply("_Make sure Hotaro-md is running on heroku!_");
        await fixHerokuAppName(message)
        if (match[1] === '') return await message.reply("Variable not found")
        await heroku.get(baseURI + '/config-vars').then(async (vars) => {
            key = match[1].trim();
            for (vr in vars) {
                if (key == vr) {
                    await heroku.patch(baseURI + '/config-vars', {
                        body: {
                            [key]: null
                        }
                    });
                    return await message.reply("Variable Deleted successfully")
                }
            }
            await await message.reply("Variable not found")
        }).catch(async (error) => {
            await message.reply(error.message)
        });

    });
 command(
  {
        pattern: 'getvar ?(.*)',
        fromMe: true,
        desc: "Get a Variable",
        type: 'heroku'
    }, async (message, match) => {
        if (match === '') return await message.reply("Variable not found")
        return await message.reply(process.env[match.trim()]?.toString() || "Not found")
   });
 command(
  {
            pattern: "allvar",
            fromMe: true,
            desc: "get all variables",
            type: 'heroku'
        }, async (message, match) => {
            if (isVPS) {
                return await message.reply(fs.readFileSync(`../config.env`).toString('utf-8'));
            }
            if (!isHeroku) return await message.reply("_Make sure Hotaro-md is deployed on heroku!_");
            await fixHerokuAppName(message)
            let msg = "☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬" + "\n\n\n```"
            await heroku
                .get(baseURI + "/config-vars")
                .then(async (keys) => {
                    for (let key in keys) {
                        msg += `${key} : ${keys[key]}\n\n`
                    }
                    return await message.reply(msg += '```')
                })
                .catch(async (error) => {
                    await message.reply(error.message)
                })

        }
    );

command(
 {
        pattern: 'setsudo ?(.*)',
        fromMe: true,
        desc: "make quoted user sudo",
        type: 'owner'
    }, async (message, match) => {
    if (!match || !match[1]) return await message.reply("*you need to provide a user to add as sudo*"); 
    const oldSudo = process.env.SUDO.split(",")
    var newSudo = ( message.reply_message ? message.reply_message.jid : '' || message.mention[0] || match[1]).split("@")[0]
    if (!newSudo) return await message.reply("*you need to reply/mention/number*")
    newSudo = newSudo.replace(/[^0-9]/g, '');
    if (!oldSudo.includes(newSudo)) {
    oldSudo.push(newSudo)
    var setSudo = oldSudo
    setSudo = setSudo.map(x => {
        if (typeof x === 'number') {
          return x.toString();
        } else {
          return x.replace(/[^0-9]/g, '');
        }
      }).join(',')
    await message.sendMessage(message.jid,{text:'_Successfully Added @'+newSudo+' as sudo_',mentions:[newSudo+"@s.whatsapp.net"]})
    await setVar("SUDO",setSudo,m)
    } else{ return await message.reply("_User is already a sudo_")}
});
command(
 {
        pattern: 'getsudo ?(.*)',
        fromMe: true,
        desc: "get bot sudo",
        type: 'owner'
    }, async (message, match) => {
    return await message.reply(config.SUDO);
    });
command(
 {
         pattern: 'delsudo ?(.*)',
         fromMe: true, 
         desc: "Deletes sudo",
         type: "owner"
 }, async (message, mm) => { 
    const oldSudo = process.env.SUDO.split(",")
    var newSudo = ( message.reply_message ? message.reply_message.jid : '' || message.mention[0] || mm[1]).split("@")[0]
    if (!newSudo) return await message.reply("*you need to reply/mention/number*")
    if (oldSudo.includes(newSudo)) {
    oldSudo.push(newSudo)
    var setSudo = oldSudo
    setSudo = setSudo.filter(x=>x!==newSudo.replace(/[^0-9]/g, '')).join(',')
    await message.sendMessage(message.jid,{text:'_Successfully Removed @'+newSudo+' from sudo!_',mentions:[newSudo+"@s.whatsapp.net"]})
    await setVar("SUDO",setSudo,m)
    } else { return await message.reply("_User is not a sudo_")
};
 });
