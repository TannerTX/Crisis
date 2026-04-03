const { joinVoiceChannel } = require('@discordjs/voice')
const client = require("../index.js")

module.exports = {
    name: 'join',
    description: 'Bot joins your VC',
    usage: ',join',
    async execute(message, args) {

        if(!message.member.roles.cache.has(client.OWNER_ROLE))
            return message.channel.send(`${message.author} | Insufficient Permissions!`)
                .then(msg => setTimeout(() => msg.delete(), 5000))

        if(!message.member.voice.channel)
            return message.channel.send(`${message.author} | You are not in a voice channel!`)
                .then(msg => setTimeout(() => msg.delete(), 5000))

        const channel = message.member.voice.channel

        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        })

        message.channel.send(`Joined ${channel.name}`)
    }
}