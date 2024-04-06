const { Client, GatewayIntentBits, EmbedBuilder, Collection, ActivityType, Intents } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
        ] });

const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config()
const axios = require('axios');
const cheerio = require('cheerio');

/*      GLOBALS       */
const PREFIX = ','
const ERROR_CHANNEL_ID = process.env.ERROR_CHANNEL_ID
const GHOST_CHANNEL_ID = process.env.GHOST_CHANNEL_ID
const MAIN_CHANNEL_ID = process.env.MAIN_CHANNEL_ID
const PRESENCE_UPDATE_CHANNEL_ID = process.env.PRESENCE_CHANNEL_ID
const COMMAND_FILES = fs.readdirSync("./commands").filter(file => file.endsWith('.js'))
const deafenTimes = new Map()
client.commands = new Collection()


let COMMANDS_EMBED = new EmbedBuilder()
    .setColor("#23ccc6")
    .setTitle("Commands")
    .setAuthor({ name: 'TannerTX', iconURL: 'https://imgur.com/gvBJrqo.png', url: 'https://discord.js.org' })


const Mongo_Connection = mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
console.log("Successfully connected to the database!")
}).catch((err) => console.log(err))

/*    MONGOOSE MODELS    */
const symbol = require("./mongooseModels/stocks.js")

/*      COMMAND DETECTION/CREATION       */
for(const file of COMMAND_FILES) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command, command.description, command.usage)

    COMMANDS_EMBED.addFields({name: `${command.name}`, value: `**𝚄𝚜𝚊𝚐𝚎:** \`${command.usage}\`\n${command.description}`})
}

module.exports.COMMANDS_EMBED = COMMANDS_EMBED
module.exports.CHANNELS = client.channels
module.exports.TEXT_CHANNELS = ['762009285705465872', '762009879673569310', '762009285705465874']
module.exports.VOICE_CHANNELS = ['762009285957386240', '762009285957386241', '762009535334187059', '762009650513707028', '762009503050498100']
module.exports.ROLES = ['762015812088365067', '762016135150436362', '762024356229677066', '762131777732608000']
module.exports.BOT_KNOWN_ROLES = client.roles
module.exports.OWNER_ROLE = process.env.OWNER_ROLE
module.exports.OWNER_ID = '247557493738176512'
module.exports.STOCKS_CHANNEL_ID = process.env.STOCKS_CHANNEL_ID
module.exports.symbolModel = symbol
module.exports.EmbedBuilder = EmbedBuilder
module.exports.DEAFEN_TIMES = deafenTimes
module.exports.GHOST_CHANNEL_ID = GHOST_CHANNEL_ID
module.exports.MAIN_CHANNEL_ID = MAIN_CHANNEL_ID


/*     EVENT HANDLER(s)      */
client.once('ready', async () => {
    console.log("Online!")
    const GUILD = client.guilds.cache.get('762009285705465866')
    module.exports.GUILD = GUILD
    client.user.setStatus("dnd");
    const STATUS_MESSAGE = [`Prefix: ${PREFIX}`, "Ay Wassup Street", "Hi Brandon", "Gabe Deluca"]
    let i = 0

    setInterval(() => {
        if (i < STATUS_MESSAGE.length) {
            client.user.setActivity(`${STATUS_MESSAGE[i]}`);
            i++
        }
        else i = 0
    }, 7000)

})

  
  


client.on('messageCreate', (message) => {
    if(message.author.bot) return;

    /*  CREATE DATE FOR TIMESTAMP   */
    var today = new Date()
    var date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    /*   EXTRACT COMMAND DATA   */
    let args = message.content.split(" ")
    let CMD = args[0].toLowerCase().substring(1)
    let author = `${message.author}`

    /*   EXECUTE COMMAND   */
    if(args[0].startsWith(PREFIX)) {

        try {
            // Execute command if proper
            client.commands.get(CMD).execute(message, args, client)
            if(message.member.roles.cache.has(process.env.OWNER_ROLE)) message.delete()
            else
                setTimeout(() => message.delete(), 3000)
        }
        catch(e) {
            console.log(e)
             client.channels.cache.get(ERROR_CHANNEL_ID).send(`------------------\n**Invoker:** ${message.author}\n**Channel:** ${message.channel}\n**Occurrence:** *${date} | ${time}*\n**Output:** ${e}\n`)
             message.channel.send(`${author} | \`${CMD}\`Command not recognized. Try \`,commands\` for a list of commands`).then(msg => setTimeout(() => msg.delete(), 5000))
        }

    }

})

client.on('voiceStateUpdate', (oldState, newState) => {
    if (!newState.member || newState.member.user.bot) return;

    const now = Date.now();

    if (newState.selfDeaf) {
        if (!deafenTimes.has(newState.member.id)) {
            deafenTimes.set(newState.member.id, {
                startTime: now,
                totalDeafenedTime: 0,
            });
        }
    } else {
        if (deafenTimes.has(newState.member.id)) {
            const entry = deafenTimes.get(newState.member.id);
            entry.totalDeafenedTime += now - entry.startTime;
            entry.startTime = now; // Update startTime
            deafenTimes.set(newState.member.id, entry);
        }
    }
});



client.on('presenceUpdate', (oldMember, newMember) => {
    
    const GUILD = newMember.guild
    const USER = client.users.cache.get(newMember.user.id)
    var ACTIVITY_LEN = newMember.member.presence.activities.length
    const PROHIBITED_GAMES = ["League of Legends"]

    if(newMember.user.bot) return

    if(ACTIVITY_LEN > 0) {

        const ACTIVITY_EMBED = new EmbedBuilder()
            .setColor("#7842f5")
            .setTitle(`Activity Update`)
            .setTimestamp()
            .setAuthor({ name: `${client.users.cache.get(newMember.user.id).username}`, iconURL: `${USER.displayAvatarURL()}`, url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1`})
        
        for(let i = 0; i < ACTIVITY_LEN; i++) {

            var ACTIVITY = newMember.member.presence.activities[i]
            
            ACTIVITY_EMBED.addFields({ name:`${ACTIVITY.name}`, value: `${ACTIVITY.details ? ACTIVITY.details:""} | ${ACTIVITY.state ? ACTIVITY.state:""}` })

            if( PROHIBITED_GAMES.includes(ACTIVITY.name.toLowerCase()) ) {
                client.channels.cache.get('762009285705465872').send(`**Kicked** <@${newMember.user.id}> for playing ${ACTIVITY.name}`)
                GUILD.members.kick(newMember.user.id, { reason: 'Playing League' })                
            }
        }

        client.channels.cache.get(PRESENCE_UPDATE_CHANNEL_ID).send({ embeds: [ACTIVITY_EMBED] })
    }
})

client.login(process.env.BOT_TOKEN)
