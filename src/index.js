/**
 * NodeJS Discord Bot
 */

const fs = require('fs');
const path = require('path');

const { discordToken } = require('../config.json');

const { Collection, Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
});

/**
 * Attach commands and settings to client
 */
client.commands = new Collection();

/**
 * Register all events
 */
(() => {
    const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

    eventFiles.forEach((file) => {
        const event = require(path.join(__dirname, `events/${file}`));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    });
})();

client.login(discordToken);