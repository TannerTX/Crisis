const { Client, GatewayIntentBits, EmbedBuilder, Collection, ActivityType, Intents, Partials } = require('discord.js');
const client = new Client({ 
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        ] });

const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config()
const axios = require('axios');
const cheerio = require('cheerio');
const { sendToErrorChannel } = require('./utilities/ErrorHandling/sendToErrorChannel')
const { sendResponse } = require('./utilities/Responses/sendResponse')
const packageJson = require('./package.json')

/*      GLOBALS       */
const PREFIX = ','
const ERROR_CHANNEL_ID = process.env.ERROR_CHANNEL_ID
const GHOST_CHANNEL_ID = process.env.GHOST_CHANNEL_ID
const MAIN_CHANNEL_ID = process.env.MAIN_CHANNEL_ID
const OWNER_ID = process.env.OWNER_ID
const LOGGED_UPDATE_MESSAGES_CHANNEL_ID = process.env.LOGGED_UPDATE_MESSAGES_CHANNEL_ID
const PRESENCE_UPDATE_CHANNEL_ID = process.env.PRESENCE_CHANNEL_ID
const COMMAND_FILES = fs.readdirSync("./commands").filter(file => file.endsWith('.js'))
const deafenTimes = new Map()
client.commands = new Collection()


let COMMANDS_EMBED = new EmbedBuilder()
    .setColor("#23ccc6")
    .setTitle("Commands")
    .setAuthor({ name: 'TannerTX', iconURL: 'https://imgur.com/gvBJrqo.png', url: 'https://discord.js.org' })

// UNCOMMENT WHEN USING
// const Mongo_Connection = mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
// console.log("Successfully connected to the database!")
// }).catch((err) => console.log(err))

/*    MONGOOSE MODELS    */
// const symbol = require("./mongooseModels/stocks.js")

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
module.exports.OWNER_ID = OWNER_ID
module.exports.STOCKS_CHANNEL_ID = process.env.STOCKS_CHANNEL_ID
// module.exports.symbolModel = symbol  UNCOMMENT WHEN USING
module.exports.EmbedBuilder = EmbedBuilder
module.exports.DEAFEN_TIMES = deafenTimes
module.exports.GHOST_CHANNEL_ID = GHOST_CHANNEL_ID
module.exports.MAIN_CHANNEL_ID = MAIN_CHANNEL_ID
module.exports.LOGGED_UPDATE_MESSAGES_CHANNEL_ID = LOGGED_UPDATE_MESSAGES_CHANNEL_ID
module.exports.client = client


/*     EVENT HANDLER(s)      */
client.once('ready', async () => {
    console.log(`Online! V${packageJson.version}`)
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
                sendToErrorChannel(client, ERROR_CHANNEL_ID, message, date, time, e)
                sendResponse(message, author, CMD)
            }

        }
})

// Message Update event Handler
client.on('messageUpdate', (oldMsg, newMsg) => {

    try{
        let oldMsgContent = oldMsg.content
        let newMsgContent = newMsg.content

        const MSG_UPDATE_EMBED = new EmbedBuilder()
        .setColor("#7842f5")
        .setTitle(`VENCACA`)
        .setTimestamp()

        if (oldMsgContent !== newMsgContent) {
            
            MSG_UPDATE_EMBED.addFields({ name:`Author`, value: `<@${oldMsg.member.id}>`})
            MSG_UPDATE_EMBED.addFields({ name:`Channel`, value: `<#${oldMsg.channel.id}>`})
            MSG_UPDATE_EMBED.addFields({ name:`Message Pre-Update`, value: `\`${oldMsgContent}\``})
            MSG_UPDATE_EMBED.addFields({ name:`Message Post-Update`, value: `\`${newMsgContent}\``})

            oldMsg.channel.send({ embeds: [MSG_UPDATE_EMBED] }).then(msg => setTimeout(() => msg.delete(), 45000))

            if(oldMsg.member.id !== OWNER_ID) {
            MSG_UPDATE_EMBED.setTitle("SECRET LOG LEL")
            client.channels.cache.get(LOGGED_UPDATE_MESSAGES_CHANNEL_ID).send({ embeds: [MSG_UPDATE_EMBED] })
            }


            console.log(`MESSAGE CHANNEL: ${oldMsg.channel.name}`)
            console.log(`AUTHOR: ${oldMsg.member.nickname}`)
            console.log(`OLD MESSAGE: ${oldMsg.content}`)
            console.log(`NEW MESSAGE: ${newMsg.content}`)
        }
    }
    catch(e) {
        console.log(e)
    }
})


client.on('presenceUpdate', (oldMember, newMember) => {
    try {
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
    }
    catch(e){
        console.log(e)
    }
})

client.login(process.env.BOT_TOKEN)
