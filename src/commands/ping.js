module.exports = {
    name: 'ping',
    /**
     * 
     * @param {import('discord.js').Message<boolean>} message 
     */
    execute(message) {
        message.channel.send('Pong!');
    }
}