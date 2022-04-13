const { logger } = require('./logger')

/**
 * 
 * @param {import('discord.js').Message<boolean>} message 
 * @param {any} content 
 * @param {number} timeout 
 */
function sendMessageAndDeleteCommand(message, content, timeout) {
    message.channel.send(content).then(() => {
        deleteCommandAfterTimeout(message, timeout);
    });
}

/**
 * 
 * @param {import('discord.js').Message<boolean>} message 
 * @param {number} timeout 
 */
function deleteCommandAfterTimeout(message, timeout) {
    setTimeout(() => message.delete().catch(logger.error), timeout)
}

/**
 * 
 * @param {import('discord.js').Message<boolean>} message 
 * @param {number} timeout 
 */
function deleteCommandAndMessageUser(message, content, timeout) {
    deleteCommandAfterTimeout(message, timeout);

    message.author.send(content).catch(logger.error);
}

module.exports = {
    sendMessageAndDeleteCommand,
    deleteCommandAfterTimeout,
    deleteCommandAndMessageUser
}