const { getVoiceConnection } = require('@discordjs/voice')
const client = require("../index.js")

module.exports = {
    name: 'leave',
    description: 'Bot leaves VC',
    usage: ',leave',
    async execute(message, args) {

        if(!message.member.roles.cache.has(client.OWNER_ROLE))
            return message.channel.send(`${message.author} | Insufficient Permissions!`)
                .then(msg => setTimeout(() => msg.delete(), 5000))

        const connection = getVoiceConnection(message.guild.id)

        if(!connection)
            return message.channel.send(`I'm not in a voice channel!`)
                .then(msg => setTimeout(() => msg.delete(), 5000))

        connection.destroy()
        message.channel.send(`Left the voice channel`)
    }
}