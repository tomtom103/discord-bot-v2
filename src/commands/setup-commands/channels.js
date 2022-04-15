module.exports = {
    name: 'channels',

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(client, message) {
        const allowedBotChannelIds = client.settings.get(message.guild.id, 'allowedBotChannelIds') || [];
        for(let channel of message.mentions.channels.values()) {
            allowedBotChannelIds.push(channel.id);
        }

        client.settings.set(message.guild.id, allowedBotChannelIds, 'allowedBotChannelIds')
    },
};