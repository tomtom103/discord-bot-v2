/**
 * Registering Discord commands
 * Careful, this file only needs to be executed once.
 * 
 * You should only run it again if you add or edit existing commands
 */

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./slash-commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./slash-commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log(`Successfully registered application slash commands for guild ${guildId}.`))
    .catch(console.error);

