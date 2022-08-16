const { Client, GatewayIntentBits, EmbedBuilder, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] }); 
const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config()

/*      GLOBALS       */
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


/*      COMMAND DETECTION/CREATION       */
for(const file of COMMAND_FILES) {
    const command = require(`./commands/${file}`)
    client.commands.set(command, command.name, command.description, command.usage)

    COMMANDS_EMBED.addFields({name: `${command.name}`, value: `Usage: ${command.usage}\n${command.description}`})
}



/*     EVENT HANDLER(s)      */
client.once('ready', async () => {
    console.log("ONLINE!")
})

client.on('message', (message) => {

    console.log(message.content)
    let args = message.content.split(" ")
    let author = `<@${message.author}>`
    if(args[0].startsWith(process.env.PREFIX)) {

        if(message.author.bot) return;

        try {
            
            fs.readdirSync("../sdfkljn")

        }
        catch(e) {
            console.log(e)
            message.channel.send(`Command not recognized. Try \`,commands\``)
        }



    }

})

client.login(process.env.BOT_TOKEN)