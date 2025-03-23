function sendToErrorChannel(client, ERROR_CHANNEL_ID, message, date, time, error) {
    client.channels.cache.get(ERROR_CHANNEL_ID).send(`------------------\n**Invoker:** ${message.author}\n**Channel:** ${message.channel}\n**Occurrence:** *${date} | ${time}*\n**Output:** ${error}\n`)
}

module.exports.sendToErrorChannel = sendToErrorChannel
