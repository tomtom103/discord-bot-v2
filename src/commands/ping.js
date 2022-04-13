module.exports = {
    name: 'ping',
    
    /**
     * @param {import('discord.js').Client} _client
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(_client, message) {
        message.channel.send('Pong!');
    }
}