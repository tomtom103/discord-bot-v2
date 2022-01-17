

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {import('discord.js').Client} client 
     */
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        const allActiveGuilds = client.guilds;
        allActiveGuilds.cache.forEach((guild) => {
            
        })
    }
}