/**
 * NodeJS Discord Bot
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '..', '.env')
});

const { Collection, Client, Intents } = require('discord.js');
const { defaultSettings } = require('./per-server');

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
client.settings = defaultSettings

/**
 * Register all events
 */
(() => {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

    eventFiles.forEach((file) => {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    });
})();

/**
 * Register all commands
 */
(() => {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    commandFiles.forEach((file) => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
    })
})();

client.login(process.env.DISCORD_TOKEN);