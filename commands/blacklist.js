const client = require("../index.js")

module.exports = {
    name: 'blacklist',
    description: 'This is a test command',
    usage: 'this is the usage',
    execute(message) {
        message.channel.send(`${client.BLACKLISTED_WORDS}`)
    }

}