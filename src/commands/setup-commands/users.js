module.exports = {
    name: 'users',

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(client, message) {
        const adminUserNames = client.settings.get(message.guild.id, 'adminUserNames') || [];
        for(let member of message.mentions.members.values()) {
            adminUserNames.push(member.user.tag);
        }

        client.settings.set(message.guild.id, adminUserNames, 'adminUserNames')
    },
};