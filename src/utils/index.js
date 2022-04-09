const { 
    allowedBotChannelNames, 
    adminUserNames, 
    adminRoleIds 
} = require('../../config.json');

/**
 * Verify that a user has the required permissions to access a bot ressource
 * @param {import('discord.js').GuildMember} member 
 */
function hasAdminPermissions(member) {
    // If admin privileges are not configured, everyone can access everything...
    if(!adminUserNames && !adminRoleIds) return true;
    if (adminUserNames.includes(member.user.id)) return true;
    return member.roles.cache.some((role) => adminRoleIds.includes(role.id));
}

/**
 * 
 * @param {import('discord.js').Message<boolean>} message 
 * @returns 
 */
function botCanSendMessage(message) {
    // If allowedBotChannelNames is empty, we can parse messages from any channel
    if(allowedBotChannelNames.length === 0) return true;

    // Should only parse messages in provided channels
    return allowedBotChannelNames.includes(message.channel.name);
}

module.exports = {
    hasAdminPermissions,
    botCanSendMessage
}