const { Collection } = require('discord.js');

const { commandPrefix } = require('../../config.json');
const { hasAdminPermissions } = require('../utils/index');
const { logger } = require('../utils/logger');
const { callOnce } = require('../utils/callOnce');

const fs = require('fs');
const path = require('path');

const prefixCommands = new Collection();

callOnce(() => {
    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));

    commandFiles.forEach((file) => {
        const command = require(path.join(__dirname, `../commands/${file}`));
        prefixCommands.set(command.name, command);
    })
})();

module.exports = {
    name: 'messageCreate',

    /**
     * @param {import('discord.js').Client} _client
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(_client, message) {
        if(!message.content?.startsWith(commandPrefix) || message.author.bot) return;

        logger.info(`User ${message.author.username} wrote: ${message.content}`);

        const args = message.content.substring(1).split(" ");
        const command = prefixCommands.get(args.shift().toLowerCase());

        if (!command) return;

        command.execute(_client, message, args);
    },
};
