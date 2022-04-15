const { MessageEmbed } = require("discord.js")

/**
 * 
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Message<boolean>} message 
 * @returns {import('discord.js').MessageEmbed}
 */
exports.configurationMessageEmbed = (client, message) => {
    const prefix = client.settings.get(message.guild.id, "prefix") || '!';
    return new MessageEmbed()
        .setColor('#F8C300')
        .setTitle('Configuration du serveur')
        .setDescription('Commandes de configuration. Veuillez entrer une des commandes suivantes pour changer la configuration par défaut du serveur. Si aucune commande est entrée, la configuration par défaut sera appliquée au bout de 60 secondes')
        .addFields(
            { name: `${prefix}name <valeur>`, value: 'Change le nom du serveur' },
            { name: `${prefix}prefix <char>`, value: 'Change le préfixe du bot (il ne faut pas utiliser le caractère "/")' },
            { name: `${prefix}users <liste d\'utilisateurs>`, value: `Autorise une liste d\'utilisateurs spécifiques qui peuvent utiliser les commandes administrateur du bot. Exemple: ${prefix}users @thom @Nikolay` },
            { name: `${prefix}roles <liste de rôles>`, value: `Autorise une liste de rôles qui peuvent utiliser les commandes administrateur du bot. Exemple: ${prefix}roles @Chargés @Professeurs` },
            { name: `${prefix}channels <liste de salons>`, value: `Liste de chaines ou le bot a le droit de lire des messages (Si aucune valeur, le bot peut lire partout). Exemple: ${prefix}channels #salon #salon2` },
        );
}

/**
 * 
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Message<boolean>} message 
 * @returns {import('discord.js').MessageEmbed}
 */
exports.currentConfigurationMessageEmbed = (client, message) => {
    const guildId = message.guild.id;

    const serverName = client.settings.get(guildId, "serverName") || 'MyServer';
    const commandPrefix = client.settings.get(guildId, "prefix") || '!';
    const adminRoleIds = client.settings.get(guildId, "adminRoleIds");
    const adminUserNames = client.settings.get(guildId, "adminUserNames");
    const allowedBotChannelIds = client.settings.get(guildId, "allowedBotChannelIds");

    return new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Configuration actuelle du serveur')
        .setThumbnail(message.guild.iconURL())
        .addFields(
            { name: 'Nom du serveur', value: serverName},
            { name: 'Préfixe de commande', value: commandPrefix},
            { 
                name: 'Roles Administrateurs (optionnel)', 
                value: adminRoleIds.length > 0 
                    ? adminRoleIds.map(id => message.guild.roles.cache.get(id).name).join(', ') 
                    : 'Seul les rôles qui sont Administrateurs (voir les permissions de vos Roles: Settings -> Roles -> ...)'
            },
            { 
                name: 'Channels où le bot peut voir les commandes (optionnel)', 
                value: allowedBotChannelIds.length > 0 
                    ? allowedBotChannelIds.map(channelId => message.guild.channels.cache.find(channel => channel.id === channelId).name).join(', ') 
                    : 'Tous les channels'
            },
            { 
                name: 'Utilisateurs Autorisés (par nom) (optionnel)', 
                value: adminUserNames.length > 0 
                    ? adminUserNames.join(', ') 
                    : 'Aucun utilisateur'
            },
        );

}