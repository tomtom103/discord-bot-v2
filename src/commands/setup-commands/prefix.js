module.exports = {
    name: 'prefix',

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(client, message) {
        const serverName = message.content.split(" ").slice(1).join(" ");
        client.settings.set(message.guild.id, serverName);
    },
};