/**
 * NodeJS Discord Bot
 */

const fs = require('fs');
const path = require('path');
const Enmap = require("enmap");

const { discordToken } = require('../config.json');

const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
    ]
});

/**
 * Register all events
 */
(() => {
    const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

    eventFiles.forEach((file) => {
        const event = require(path.join(__dirname, `events/${file}`));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }
    });
})();

const defaultSettings = {
    prefix: "!",
    serverName: '',
    allowedBotChannelIds: [],
    adminUserNames: [],
    adminRoleIds: [],
    sessionStarted: false,
    currentLabGroup: null,
};

client.settings = new Enmap({
    name: "settings",
    cloneLevel: 'deep',
    fetchAll: false,
    autoFetch: true,
    autoEnsure: defaultSettings,
});

client.login(discordToken);