const { botCanSendMessage, hasAdminPermissions } = require("../utils");

module.exports = {
    name: 'messageReactionAdd',

    async execute(reaction, user) {
        if (user.bot || !botCanSendMessage(reaction.message)) return;

        if(reaction.emoji.name == '➡️') {
            reaction.message.guild.members.fetch(user.id).then((member) => {
                // TODO: manageNextTicket
                if(hasAdminPermissions(member)) manageNextTicket(member);
            });
            reaction.message.reactions.resolve('➡️').users.remove(user.id);
        }
    }
}