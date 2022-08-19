const { Client, GatewayIntentBits, EmbedBuilder, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] }); 
const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config()

/*      GLOBALS       */
const ERROR_CHANNEL_ID = process.env.ERROR_CHANNEL_ID
const COMMAND_FILES = fs.readdirSync("./commands").filter(file => file.endsWith('.js'))
client.commands = new Collection()


let COMMANDS_EMBED = new EmbedBuilder()
    .setColor("#23ccc6")
    .setTitle("Commands")
    .setAuthor({ name: 'TannerTX', iconURL: 'https://imgur.com/gvBJrqo.png', url: 'https://discord.js.org' })


const Mongo_Connection = mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
console.log("Successfully connected to the database!")
}).catch((err) => console.log(err))

const word = require("./mongooseModels/word.js")
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
module.exports.ROLES = ['762009965497024514', '762015812088365067', '762016135150436362', '762024356229677066', '762131777732608000']
module.exports.OWNER_ROLE = process.env.OWNER_ROLE
module.exports.STOCKS_CHANNEL_ID = process.env.STOCKS_CHANNEL_ID
module.exports.symbolModel = symbol


/*     EVENT HANDLER(s)      */
client.once('ready', async () => {
    console.log("Currently Slapping Brandon's Ass")
    client.user.setActivity(`Stirring the Pot`);
    client.user.setStatus("dnd");
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
    if(args[0].startsWith(process.env.PREFIX)) {

        try {
            // Execute command if proper
            client.commands.get(CMD).execute(message, args, client)
            if(message.member.roles.cache.has(process.env.OWNER_ROLE))
                message.delete()
            else
                setTimeout(() => message.delete(), 5000)
        }
        catch(e) {
             client.channels.cache.get(ERROR_CHANNEL_ID).send(`**Occurrence:** *${date} | ${time}*\n**Output:** ${e}`)
             message.channel.send(`${author} | \`${CMD}\`Command not recognized. Try \`,commands\` for a list of commands`).then(msg => setTimeout(() => msg.delete(), 5000))
        }

    }

})

client.login(process.env.BOT_TOKEN)