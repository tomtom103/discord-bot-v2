module.exports = {
	name: 'guildMemberAdd',
	/**
     * Function will be run whenever a new member joins the server
     * @param {import('discord.js').Client} _client
     * @param {import('discord.js').GuildMember} member 
     */
	execute(_client, member) {
        // Fetch the serverName directly from the configuration
        const serverName = _client.settings.get(member.guild.id, "severName") || '';
        const welcomeMessage = `Bienvenue dans le serveur de ${serverName} !\n\n` + 
            "Pour que nous puissions vous attribuer vos permissions dans le serveur Discord " +
            "veuillez utiliser le format suivant pour votre pseudo: \n" +            
            "Prénom Nom - XYZ \n" +
            "où XYZ est votre numéro d'équipe (lorsqu'il vous aura été attribué) \n" +
            "Exemple : Nikolay Radoev - 101";

        member
            .send(welcomeMessage)
            .catch(console.error);
	},
};