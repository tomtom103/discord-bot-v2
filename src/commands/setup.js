/**
 * Configure the bot to use the right guild settings
 * 
 * This only needs to be run once when the bot first joins a guild.
 * 
 * Settings will be persisted
 */

const Enmap = require("enmap");
const { MessageEmbed, Collection } = require('discord.js');

const defaultSettings = {
    prefix: "!",
    serverName: null,
    allowedBotChannelNames: [],
    adminUserNames: [],
    adminRoleIds: [],
    sessionStarted: false,
    currentLabGroup: null,
}

const configurationMessageEmbed = new MessageEmbed()
    .setColor('#F8C300')
    .setTitle('Configuration du serveur')
    .setDescription('Commandes de configuration. Veuillez entrer une des commandes suivantes pour changer la configuration par défaut du serveur. Si aucune commande est entrée, la configuration par défaut sera appliquée au bout de 60 secondes')
    .addFields(
        { name: '!nom <valeur>', value: 'Change le nom du serveur' },
        { name: '!prefixe <char>', value: 'Change le préfixe du bot (il ne faut pas utiliser le caractère "/")' },
        { name: '!users <liste d\'utilisateurs>', value: 'Autorise une liste d\'utilisateurs spécifiques qui peuvent utiliser les commandes administrateur du bot. Exemple: !users @thom @Nikolay' },
        { name: '!roles <liste de rôles>', value: 'Autorise une liste de rôles qui peuvent utiliser les commandes administrateur du bot. Exemple: !roles @Chargés @Professeurs' },
        { name: '!channels <liste de salons>', value: 'Liste de chaines ou le bot a le droit de lire des messages (Si aucune valeur, le bot peut lire partout). Exemple: !channels #salon #salon2' },
    )

const setupCommands = new Collection();

setupCommands.set('prefixe', (message, args) => {
});

const sendMessageEmbedAndWaitForInput = async (message) => {
    return;
};

module.exports = {
    name: 'setup',

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(client, message) {
        client.settings = new Enmap({
            name: "serverSettings",
            cloneLevel: 'deep',
            fetchAll: false,
            autoensure: defaultSettings,
        });

        const guildId = message.guild.id;
        const adminRoleIds = client.settings.get(guildId, "adminRoleIds");
        const adminUserNames = client.settings.get(guildId, "adminUserNames");
        const allowedBotChannelNames = client.settings.get(guildId, "allowedBotChannelNames");

        const currentConfigurationMessageEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Configuration actuelle du serveur')
            .setThumbnail(message.guild.iconURL())
            .addFields(
                { name: 'Nom du serveur', value: client.settings.get(guildId, "serverName")},
                { name: 'Préfixe de commande', value: client.settings.get(guildId, "prefix")},
                { 
                    name: 'Roles Administrateurs (optionnel)', 
                    value: adminRoleIds.length > 0 
                        ? adminRoleIds.map(id => message.guild.roles.cache.get(id).name).join(', ') 
                        : 'Seul les rôles qui sont Administrateurs (voir les permissions de vos Roles: Settings -> Roles -> ...)'
                },
                { 
                    name: 'Channels où le bot peut voir les commandes (optionnel)', 
                    value: allowedBotChannelNames.length > 0 
                        ? allowedBotChannelNames.map(channelName => message.guild.channels.cache.find(channel => channel.name === channelName).name).join(', ') 
                        : 'Tous les channels'
                },
                { 
                    name: 'Utilisateurs Autorisés (par nom) (optionnel)', 
                    value: adminUserNames.length > 0 
                        ? adminUserNames.join(', ') 
                        : 'Aucun utilisateur'
                },
            );
        message.channel.send({ embeds: [configurationMessageEmbed, currentConfigurationMessageEmbed]});
        // let filter = m => m.author.id === message.author.id
        // message.channel.send({ embeds: [currentConfigurationMessageEmbed, configurationMessageEmbed]}).then(() => {
        //     message.channel.awaitMessages(
        //         { 
        //             filter: filter, 
        //             max: 1,
        //             time: 10_000,
        //             errors: ['time']
        //         })
        //         .then((collected) => {
        //             const serverName = collected.first().content;
        //             client.settings.set(message.guild.id, { ...defaultSettings, serverName });
        //             message.channel.send(`Le nom du serveur est désormais ${serverName}`);
        //             console.log(client.settings);
        //         })
        //         .catch((collected) => {
        //             message.channel.send(`Vous n'avez pas répondu dans le temps imparti... Raison: ${_reason}`);
        //         });
        // });
    }
}