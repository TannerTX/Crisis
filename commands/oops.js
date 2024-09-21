const client = require("../index.js")

module.exports = {
    name: 'oops',
    description: 'This is a test command',
    usage: 'this is the usage',
    execute(message) {
        message.channel.send("https://media.discordapp.net/attachments/762031144627077120/1228516188666204170/image.png?ex=662c53dc&is=6619dedc&hm=dabfee1f74a7613263a537d7f0d467f221e9add9c41527bd4e2afd15535fd543&=&format=webp&quality=lossless&width=836&height=139")
    }

}