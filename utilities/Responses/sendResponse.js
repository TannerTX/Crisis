function sendResponse(message, author, CMD) {
    message.channel.send(`${author} | \`${CMD}\`Command not recognized. Try \`,commands\` for a list of commands`).then(msg => setTimeout(() => msg.delete(), 5000))
}

module.exports.sendResponse = sendResponse