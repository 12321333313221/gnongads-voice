const { BaseGuildVoiceChannel } = require("discord.js");
module.exports = {
    name: "add",
    func: function (models, message, commands) {
        if (commands.length != 3) {
            return;
        }
        let kUserId = commands[2];
        if (message.member.id === kUserId) {
            message.reply("так нельзя");
            return;
        }
        models.UserChannel.getChannel(message.guildId, message.channelId)
            .then((data) => {
                if (!data || message.member.id != data.creatorId) {
                    return;
                }
                models.KickedUser.create(
                    data.guildId,
                    data.channelId,
                    data.creatorId,
                    kUserId
                ).then(() => {
                    return message.guild.members
                        .fetch(kUserId)
                        .then((gm) => {
                            if (!gm) {
                                return;
                            }
                            if (
                                message.channel.members.find(
                                    (member) => member.id === kUserId
                                )
                            ) {
                                return gm.voice.disconnect(
                                    "запрос пользователя"
                                );
                            }
                        })
                        .then(() => {
                            message.reply("успех");
                        })
                        .catch((err) => {
                            message.reply("пользователь отсутвует");
                        });
                });
            })
            .catch((err) => {
                console.log(`err`, err);
            });
    },
};
