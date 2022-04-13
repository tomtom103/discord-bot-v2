const { logger } = require('../utils/logger');
const { deleteMessageAfterTimeout, sendMessageAndDeleteAfterTimeout, deleteAndMessageUser } = require('../utils/messages')
const { sessionStarted } = require('../utils/variables')

module.exports = {
    name: 'list',

    /**
     * 
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(message) {
        try {
            if (!sessionStarted) {
                deleteMessageAfterTimeout(message);
    
                deleteAndMessageUser(message, "Aucune session est active", 1000);
            }
        } catch(err) {
            logger.error(err);
        }
    }
}