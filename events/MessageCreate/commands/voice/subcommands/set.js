module.exports = {
    name: "set",
    func: function (models, message, commands) {
        message.guild.members.fetch(message.member.id).then((gm) => {
            let channel = gm.voice.channel;
            if (!channel) {
                message.reply(
                    "напишите эту команду для закрытия или открытия своего войс чата"
                );
                return;
            }
            if (channel.userLimit === 0) {
                channel.setUserLimit(
                    channel.members.size,
                    "узер запросил лимит"
                );
                message.reply("закрыл");
                return;
            }
            channel.setUserLimit(0, "узер запросил убрать лимит");
            message.reply("открыл");
        });
    },
};
