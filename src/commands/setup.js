/**
 * Configure the bot to use the right guild settings
 * 
 * This only needs to be run once when the bot first joins a guild.
 * 
 * Settings will be persisted
 */

const { Collection } = require('discord.js');
const {
    configurationMessageEmbed,
    currentConfigurationMessageEmbed,
} = require('../utils/embeds');
const { callOnce } = require('../utils/index');

const fs = require('fs');
const path = require('path');

const setupCommands = new Collection();

// Registering commands
callOnce(() => {
    const setupCommandFiles = fs.readdirSync(path.join(__dirname, './setup-commands')).filter(file => file.endsWith('.js'));
    console.log(setupCommandFiles)
    setupCommandFiles.forEach((file) => {
        const command = require(path.join(__dirname, `./setup-commands/${file}`));
        setupCommands.set(command.name, command);
    });
})();

/**
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Message<boolean>} message 
 * @param {Array<import('discord.js').MessageEmbed>} embeds
 */
const sendMessageAndWaitForResponse = (client, message) => {
    const commandPrefix = client.settings.get(message.guild.id, "prefix") || "!";

    let messageFilter = m => m.author.id === message.author.id;

    message.channel.awaitMessages(
        {
            filter: messageFilter,
            max: 1,
            time: 30_000,
            errors: ['time']
        }
    ).then((collected) => {
        const latestMessage = collected.first();
        if (latestMessage.content?.startsWith(commandPrefix)) {
            const args = latestMessage.content.substring(1).split(" ");
            console.log(args);
            const command = setupCommands.get(args.shift().toLowerCase());
            console.log(args);
            if (!command) return;

            command.execute(client, latestMessage, args);

            message.channel.send({ embeds: [currentConfigurationMessageEmbed(client, message)] }).then(() => {
                sendMessageAndWaitForResponse(client, message);
            });
        }
        
    }).catch(
        (_collected) => {
            message.channel.send("Configuration terminee!")
        }
    );
}


module.exports = {
    name: 'setup',

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(client, message) {
        message.channel.send({ embeds: [
            configurationMessageEmbed(client, message), 
            currentConfigurationMessageEmbed(client, message)
        ]}).then(() => {
            // Start waiting for next message (nested logic)
            sendMessageAndWaitForResponse(client, message);
        });
    }
}