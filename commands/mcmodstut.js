const client = require("../index.js")
// const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'mcmodstut',
    description: 'Displays a quick tutorial on how to install the mc mods',
    usage: ',mcmodstut',
    execute(message) {
        const embed = new client.EmbedBuilder()
            .setTitle("Installation Guide")
            .addFields(
                {
                    name: "Pre-Requisites",
                    value: "-> [Download CurseForge](https://www.curseforge.com/download/app)\n-> Download HEY-GUYS-1.0 zip file\n----------------",
                    inline: false
                },
                {
                name: "1.) Open CurseForge",
                value: "-> Click the home button in top left \n-> choose MC\n----------------",
                inline: false
                },
                {
                name: "2.) Click \"Create Custom Profile\" in top right",
                value: "-> Click the underlined \"import\" button at the top\n----------------",
                inline: false
                },
                {
                name: "3.) Choose the HEY-GUYS-1.0 zip, press \"create\"",
                value: "-> Let everything download\n-> Hit play on the pack\n----------------",
                inline: false
                },
            )
            .setColor("#ff4000")
            .setThumbnail("https://mir-s3-cdn-cf.behance.net/project_modules/disp/55f4fe25313465.56343c96c2b25.jpg")
            .setTimestamp();

            message.channel.send({
                                 files: ["./files/HEY-GUYS-1.0.zip"],
                                 embeds: [embed]  
                                });
    }

}