module.exports = {
    name: 'prefix',

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(client, message) {
        const prefix = message.content.split(" ")[1];
        client.settings.set(message.guild.id, prefix, "prefix");
    },
};