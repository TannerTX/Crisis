const client = require("../index.js")

module.exports = {
    name: 'bartpost',
    description: 'Bartposts xD',
    usage: ',bartpost',
    execute(message) {
        message.channel.send("https://imgur.com/vt0KocM \n https://imgur.com/57p3jZ9 \n https://imgur.com/ZdaF1Fs \n https://cdn.discordapp.com/attachments/762009285705465872/1009674359557853254/bart_4.mp4").then(msg => setTimeout(() => msg.delete(), 30000))
    }

}