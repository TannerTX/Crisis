const client = require("../index.js")

module.exports = {
    name: 'toxic',
    description: 'Be toxic af',
    usage: ',toxic @user',
    execute(message, args) {
        
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const member = message.mentions.members.first()
        const CHANNELS_LIST = ['762009285957386240', // Mos Eisley
                               '762009285957386241', // Stormtrooper Jacuzzi
                               '762009535334187059', // Death Star Trench
                               '762009650513707028', // Bounty Hunters Only
                               '784634182692241449', // Music no mic
                               '778851891575652352', // Toxic Free
                               '762009503050498100'] // Minikit Hunting (AFK)

        if(!message.member.roles.cache.has(client.OWNER_ROLE)) message.channel.send(`${message.author} | Insufficient Permissions!`)

        else if(!member) message.channel.send(`${message.author} | Target user does not exist!`).then(msg => msg.delete({timeout: 5000}))
        
        else if(!member.voice.channel) message.channel.send(`${message.author} | Target user is not in a voice channel!`).then(msg => msg.delete({timeout: 5000})) 
        
        else if (member) {

            const firstChannel = member.voice.channel

            for(const chan of CHANNELS_LIST) {
                if(chan === firstChannel)
                    continue
                else member.voice.setChannel(chan)       
        }
        
        member.voice.setChannel(firstChannel)
       }
    }

}