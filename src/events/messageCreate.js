const { Collection } = require('discord.js');

const { commandPrefix } = require('../../config.json');
const { botCanSendMessage } = require('../utils/index');
const { logger } = require('../utils/logger');
const { callOnce } = require('../utils/callOnce');

const fs = require('fs');
const path = require('path');

const commands = new Collection();

callOnce(() => {
    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));

    commandFiles.forEach((file) => {
        const command = require(path.join(__dirname, `../commands/${file}`));
        commands.set(command.name, command);
    })
})();

module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(message) {
        // TODO: Add command parsing...
        if(!botCanSendMessage(message) || !message.content.startsWith(commandPrefix)) return;

        logger.info(`User ${message.author.username} wrote: ${message.content}`);

        const args = message.content.substring(1).split(" ");
        const command = commands.get(args.shift().toLowerCase());

        if (!command) return;

        command.execute(message, args);
    },
};
