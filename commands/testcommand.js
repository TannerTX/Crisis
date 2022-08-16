const bot = require("../index.js")

module.exports = {
    name: 'testcommand',
    description: 'This is a test command',
    usage: 'this is the usage',
    execute(message) {
        message.channel.send("This Worked!")
    }

}