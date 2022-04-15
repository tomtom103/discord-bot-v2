module.exports = {
    name: 'channels',

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(client, message) {
        const adminRoleIds = client.settings.get(message.guild.id, 'adminRoleIds') || [];
        for(let role of message.mentions.roles.values()) {
            adminRoleIds.push(role.id);
        }

        client.settings.set(message.guild.id, adminRoleIds, 'adminRoleIds')
    },
};