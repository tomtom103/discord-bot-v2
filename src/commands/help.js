const { MessageEmbed } = require('discord.js');
const { hasAdminPermissions } = require('../utils/index');
const { deleteMessageAfterTimeout } = require('../utils/messages');
const { serverName } = require('../../config.json');

const adminHelpEmbed = new MessageEmbed()
    .setColor('#F8C300')
    .setTitle(`${serverName}: Aide Commandes Admin`)
    .setDescription('Commandes disponibles avec le bot: ')
    .setThumbnail(message.guild.iconURL())
    .addFields(
        {name: `!ticket <numéro>`, value: `Indiquez votre numéro de groupe et vous serez dans la liste d'attente pour obtenir une réponse à votre question !`, inline: true},
        {name: `!list`, value: `Affiche la liste des questions en cours`, inline: true},
        {name: `!help`, value: `Envoie un message d'aide pour les étudiants`, inline: true},
        {name: `Liste des commandes administrateurs`, value: `Commandes réservées aux enseignants ci-dessous`},
        {name: `!autolist`, value: `Affiche la liste des questions en cours (mis à jour constamment)`, inline: true},
        {name: `!clear`, value: `Vide la liste d'attente des questions`, inline: true},
        {name: `!next`, value: `Vous dirige vers la conversation du prochain groupe pour gérer le ticket suivant en liste (résout le ticket automatiquement)`, inline: true},
        {name: `!start <numéro>`, value: `Débute le TP pour la section <numéro> et affiche la liste des tickets (mis à jour constamment)`, inline: true},
        {name: `!end`, value: `Termine le TP et ferme la liste des tickets`, inline: true},
    );

const studentHelpEmbed = new MessageEmbed()
    .setColor('#F8C300')
    .setTitle(`${serverName}: Aide Commandes`)
    .setDescription('Commandes disponibles avec le bot: ')
    .setThumbnail(message.guild.iconURL())
    .addFields(
        {name: `!ticket <numéro>`, value: `Indiquez votre numéro de groupe et vous serez ajoutés dans la liste d'attente pour obtenir une réponse à votre question !`, inline: true},
        {name: `!list`, value: `Affiche la liste des questions en cours`, inline: true},
        {name: `!help`, value: `Envoie ce message`, inline: true},
    );

module.exports = {
    name: 'help',

    /**
     * 
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(message) {
        const messageEmbed = hasAdminPermissions(message.member) ? adminHelpEmbed : studentHelpEmbed;

        messageEmbed.setTimestamp();

        message.channel.send({ embeds: [messageEmbed] });
        
        // Delete the message that the user sent to avoid spamming
        deleteMessageAfterTimeout(message, 1000);
    }
}