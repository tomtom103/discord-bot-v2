const { serverName } = require('../../config.json');

module.exports = {
	name: 'guildMemberAdd',
	/**
	 * Function will be executed whenever a new user joins the server.
	 * @param {import('discord.js').GuildMember} member 
	 */
	execute(member) {
        // This message can be customized to your liking :)
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