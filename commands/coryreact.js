const client = require("../index.js")

module.exports = {
    name: 'coryreact',
    description: 'react with Cory\'s name',
    usage: ',coryreact <msg id>',
    execute(message, args) {

        let MSG_ID = args[1]
        var EMJS = "🏳️‍🌈 🇨 🇴 🇷 🇾 ⚧ 🇱 🇺 🇳 🇩 🇪 🌈".split(" ")
        // message.delete()

        if(!message.member.roles.cache.has(client.OWNER_ROLE)) message.channel.send(`${message.author} | Insufficient Permissions!`)

        else if(!message.channel.messages.fetch(MSG_ID)) message.channel.send(`${message.author} | Failed to find Message!`)

        else message.channel.messages.fetch(MSG_ID).then(msg => {
            for(const emj of EMJS)
                msg.react(emj)
        })
    }

}