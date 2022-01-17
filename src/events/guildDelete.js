const { defaultSettings } = require('../per-server');

module.exports = {
	name: 'guildDelete',
	/**
	 * When the bot leaves or is kicked, delete settings to prevent stale entries
	 * @param {import('discord.js').Guild} guild 
	 */
	execute(guild) {
		defaultSettings.delete(guild.id);
	},
};