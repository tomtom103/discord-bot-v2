/**
 * Configure the bot to use the right guild settings
 * 
 * This only needs to be run once when the bot first joins a guild.
 * 
 * Settings will be persisted
 */

const Enmap = require("enmap");
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

    setupCommandFiles.forEach((file) => {
        const command = require(path.join(__dirname, `./setup-commands/${file}`));
        setupCommands.set(command.name, command);
    })
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
        for (let msg of collected.values()) {
            if(!msg.content?.startsWith(commandPrefix)) {
                const args = message.content.substring(1).split(" ");
                const command = setupCommands.get(args.shift().toLowerCase());

                if (!command) continue;

                command.execute(client, msg, args);
            }
        }
        // Stackoverflow maybe?
        message.channel.send({ embeds: [currentConfigurationMessageEmbed(client, message)] }).then((msg) => {
            sendMessageAndWaitForResponse(client, msg);
        });
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
        const defaultSettings = {
            prefix: "!",
            serverName: message.guild.name || '',
            allowedBotChannelIds: [],
            adminUserNames: [],
            adminRoleIds: [],
            sessionStarted: false,
            currentLabGroup: null,
        };

        client.settings = new Enmap({
            name: "serverSettings",
            cloneLevel: 'deep',
            fetchAll: false,
            autoensure: defaultSettings,
        });

        message.channel.send({ embeds: [
            configurationMessageEmbed(client, message), 
            currentConfigurationMessageEmbed(client, message)
        ]}).then((msg) => {
            // Start waiting for next message (nested logic)
            sendMessageAndWaitForResponse(client, msg);
        });
    }
}