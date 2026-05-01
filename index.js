const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    Collection,
    Partials,
} = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const { sendToErrorChannel } = require('./utilities/ErrorHandling/sendToErrorChannel');
const { sendResponse } = require('./utilities/Responses/sendResponse');
const { parseCommand } = require('./utilities/commandParser');
const { getNextStatusIndex } = require('./utilities/statusRotator');
const packageJson = require('./package.json');

const PREFIX = ',';
const {
    ERROR_CHANNEL_ID,
    GHOST_CHANNEL_ID,
    MAIN_CHANNEL_ID,
    OWNER_ID,
    LOGGED_UPDATE_MESSAGES_CHANNEL_ID,
    PRESENCE_CHANNEL_ID: PRESENCE_UPDATE_CHANNEL_ID,
    OWNER_ROLE,
    STOCKS_CHANNEL_ID,
    BOT_TOKEN,
} = process.env;

const client = new Client({
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
const deafenTimes = new Map();
client.commands = new Collection();

const commandsEmbed = new EmbedBuilder()
    .setColor('#23ccc6')
    .setTitle('Commands')
    .setAuthor({ name: 'TannerTX', iconURL: 'https://imgur.com/gvBJrqo.png', url: 'https://discord.js.org' });

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    commandsEmbed.addFields({
        name: command.name,
        value: `**𝚄𝚜𝚊𝚐𝚎:** \`${command.usage}\`\n${command.description}`,
    });
}

module.exports.COMMANDS_EMBED = commandsEmbed;
module.exports.CHANNELS = client.channels;
module.exports.TEXT_CHANNELS = ['762009285705465872', '762009879673569310', '762009285705465874'];
module.exports.VOICE_CHANNELS = ['762009285957386240', '762009285957386241', '762009535334187059', '762009650513707028', '762009503050498100'];
module.exports.ROLES = ['762015812088365067', '762016135150436362', '762024356229677066', '762131777732608000'];
module.exports.BOT_KNOWN_ROLES = client.roles;
module.exports.OWNER_ROLE = OWNER_ROLE;
module.exports.OWNER_ID = OWNER_ID;
module.exports.STOCKS_CHANNEL_ID = STOCKS_CHANNEL_ID;
module.exports.EmbedBuilder = EmbedBuilder;
module.exports.DEAFEN_TIMES = deafenTimes;
module.exports.GHOST_CHANNEL_ID = GHOST_CHANNEL_ID;
module.exports.MAIN_CHANNEL_ID = MAIN_CHANNEL_ID;
module.exports.LOGGED_UPDATE_MESSAGES_CHANNEL_ID = LOGGED_UPDATE_MESSAGES_CHANNEL_ID;
module.exports.client = client;

client.once('ready', async () => {
    console.log(`Online! V${packageJson.version}`);
    const guild = client.guilds.cache.get('762009285705465866');
    module.exports.GUILD = guild;

    client.user.setStatus('dnd');

    const statusMessages = [`Prefix: ${PREFIX}`, 'Ay Wassup Street', 'Hi Brandon', 'Gabe Deluca'];
    let statusIndex = 0;

    setInterval(() => {
        client.user.setActivity(statusMessages[statusIndex]);
        statusIndex = getNextStatusIndex(statusIndex, statusMessages.length);
    }, 7000);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) {
        return;
    }

    const parsed = parseCommand(message.content, PREFIX);
    if (!parsed) {
        return;
    }

    const { commandName } = parsed;
    const command = client.commands.get(commandName);

    if (!command) {
        sendResponse(message, `${message.author}`, commandName);
        return;
    }

    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toISOString().slice(11, 19);

    try {
        await command.execute(message, parsed.args, client);

        if (message.member?.roles?.cache?.has(OWNER_ROLE)) {
            await message.delete();
        } else {
            setTimeout(() => message.delete().catch(() => null), 3000);
        }
    } catch (error) {
        console.error(error);
        sendToErrorChannel(client, ERROR_CHANNEL_ID, message, date, time, error);
    }
});

client.on('messageUpdate', (oldMsg, newMsg) => {
    try {
        if (oldMsg.content === newMsg.content) {
            return;
        }

        const msgUpdateEmbed = new EmbedBuilder()
            .setColor('#7842f5')
            .setTitle('VENCACA')
            .setTimestamp()
            .addFields(
                { name: 'Author', value: `<@${oldMsg.member.id}>` },
                { name: 'Channel', value: `<#${oldMsg.channel.id}>` },
                { name: 'Message Pre-Update', value: `\`${oldMsg.content}\`` },
                { name: 'Message Post-Update', value: `\`${newMsg.content}\`` },
            );

        if (oldMsg.member.id !== OWNER_ID) {
            msgUpdateEmbed.setTitle('SECRET LOG LEL');
            client.channels.cache.get(LOGGED_UPDATE_MESSAGES_CHANNEL_ID).send({ embeds: [msgUpdateEmbed] });
        }
    } catch (error) {
        console.error(error);
    }
});

client.on('presenceUpdate', (oldMember, newMember) => {
    try {
        if (newMember.user.bot || !newMember.member?.presence?.activities?.length) {
            return;
        }

        const guild = newMember.guild;
        const user = client.users.cache.get(newMember.user.id);
        const prohibitedGames = new Set(['league of legends']);

        const activityEmbed = new EmbedBuilder()
            .setColor('#7842f5')
            .setTitle('Activity Update')
            .setTimestamp()
            .setAuthor({
                name: user.username,
                iconURL: user.displayAvatarURL(),
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1',
            });

        for (const activity of newMember.member.presence.activities) {
            activityEmbed.addFields({
                name: activity.name,
                value: `${activity.details || ''} | ${activity.state || ''}`,
            });

            if (prohibitedGames.has(activity.name.toLowerCase())) {
                client.channels.cache.get('762009285705465872').send(`**Kicked** <@${newMember.user.id}> for playing ${activity.name}`);
                guild.members.kick(newMember.user.id, { reason: 'Playing League' });
            }
        }

        client.channels.cache.get(PRESENCE_UPDATE_CHANNEL_ID).send({ embeds: [activityEmbed] });
    } catch (error) {
        console.error(error);
    }
});

client.login(BOT_TOKEN);
