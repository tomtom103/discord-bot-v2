const { defaultSettings } = require('../per-server');

module.exports = {
	name: 'guildMemberAdd',
	/**
	 * When the bot leaves or is kicked, delete settings to prevent stale entries
	 * @param {import('discord.js').GuildMember} member 
	 */
	execute(member) {
		
        defaultSettings.ensure(member.guild.id, defaultSettings);

        let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");

        welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag);

        member.guild.channels.cache
            .find(channel => channel.name === client.settings.get(member.guild.id, "welcomeChannel"))
            .send(welcomeMessage)
            .catch(console.error)
	},
};