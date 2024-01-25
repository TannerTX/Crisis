const client = require("../index.js")
const { EmbedBuilder } = require('discord.js')


module.exports = {
    name: 'deafenleaderboard',
    description: 'Displays the leaderboard for people who have deafened',
    usage: ',deafenleaderboard',
    async execute(message) {
        
        const now = Date.now()
        const leaderboard = Array.from(client.DEAFEN_TIMES)
        .map(([userId, entry]) => ({
            userId,
            totalDeafenedTime: entry.totalDeafenedTime,
        }))
        .filter(entry => entry.totalDeafenedTime > 0)
        .sort((a, b) => b.totalDeafenedTime - a.totalDeafenedTime)
        .slice(0, 10); // Display top 10 users

        const embed = new EmbedBuilder()
        .setTitle('Deafened Time Leaderboard')
        .setDescription('Top users by cumulative deafened time within the last 24 hours');

        for (const entry of leaderboard) {
            const user = await message.guild.members.cache.get(entry.userId);
            const totalDeafenedSeconds = Math.floor(entry.totalDeafenedTime / 1000);
            const hours = Math.floor(entry.totalDeafenedTime / 3600000); // Convert to hours
            const minutes = Math.floor((entry.totalDeafenedTime % 3600000) / 60000); // Convert to minutes
            const seconds = totalDeafenedSeconds % 60; // Convert to seconds again

            const str = `${hours} hours and ${minutes} minutes and ${seconds} seconds`
            embed.addFields({name:user.nickname, value:str});
        }

        message.channel.send({embeds: [embed]}).then(msg => setTimeout(() => msg.delete(), 30000))

    }

}