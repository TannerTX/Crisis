const client = require("../index.js")

module.exports = {
    name: 'kick',
    description: 'This is a test command',
    usage: 'this is the usage',
    execute(message) {
        
        
        const member = message.guild.members.cache.get('170616033902723073')
        const member2 = message.guild.members.cache.get('288174376392851457')
        member.kick('Playing League')
        member2.kick('Playing League')
    }

}