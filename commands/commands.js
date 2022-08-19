const client= require("../index.js")

module.exports = {
    name: 'commands',
    description: 'Lists *all* usable commands',
    usage: ',commands',
    execute(message) {
        message.channel.send({embeds: [client.COMMANDS_EMBED]}).then(msg => setTimeout(() => msg.delete(), 15000))
    }
}