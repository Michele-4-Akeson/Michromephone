



/*
DISCORD INITILIZATION:
*/

const discord = require("discord.js");
const bot = new discord.Client({
  intents:[
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
  ]
});



bot.on("ready", ()=>{
  console.log("discord bot logged in as " + bot.user.tag)
})


bot.login(process.env.DISCORD_BOT_TOKEN)

bot.on("messageCreate", (message)=>{
  if (message.content == "hi"){
    message.reply("hello from bot")
  }
});


async function sendDiscordMessage(username, message){
  try {
    const guild = bot.guilds.cache.get(process.env.DISCORD_SERVER_ID);
    await guild.members.fetch()
  
    guild.members.cache.each(async (member)=>{
      console.log(member.user.tag)
      if (member.user.tag == username){
        console.log("member found: ", member.user.username, member.id)
        const user = await bot.users.fetch(member.id);
        user.send(message)
        return true
        
      }
    })

    return false

  } catch (error){
        console.log(error)
        return false
  }
 

}


module.exports = {sendDiscordMessage}


