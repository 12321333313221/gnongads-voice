const { Promise } = require("bluebird");
module.exports = {
    name: "set",
    func: function (models, message, commands) {
        let kUserId;
        if (commands.length == 2) {
            kUserId = commands[1];
        }
        if (commands.length == 3) {
            kUserId = commands[2];
        }

        if (message.member.id === kUserId) {
            message.reply("так нельзя");
            return;
        }
        /**если юзер есть то его надо назад убрать */
        /**
         * берем канал
         * если такой есть то идем дальше
         * models.UserChannel.getChannel() - вернет данные о канале
         * models.KickedUser.getKickedUser() - вернет данные о кикнутом пользователе
         * models.KickedUser.create() - создаст в правиле нового юзера
         * models.KickedUser.delete() - удалить в правиле юзера
         */
        let getChannelPromise = models.UserChannel.getChannel(
            message.guildId,
            message.channelId,
            message.member.id
        );
        let getKickedUserPromise = models.KickedUser.getKickedUser(
            message.guildId,
            message.channelId,
            kUserId
        );

        Promise.all([getChannelPromise, getKickedUserPromise])
            .catch((err) => {
                console.log(`err`, err);
            })
            .then((data) => {
                const channel = data[0];
                const kickedUser = data[1];

                if (!channel) {
                    /** Если пользователь который написал команду не является создателем, то команды не работают */
                    return;
                }
                if (kickedUser.length != 0) {
                    /** если есть кикнутый пользователь то его надо убрать */
                    models.KickedUser.delete(
                        kickedUser[0].guildId,
                        kickedUser[0].channelId,
                        kickedUser[0].kickedUserId
                    );
                    message.reply("пользователь убран");
                    return;
                }
                models.KickedUser.create(
                    channel.guildId,
                    channel.channelId,
                    channel.creatorId,
                    kUserId
                );
                return message.guild.members.fetch(kUserId);
            })
            .catch((err) => {
                if (err.code === 10013) {
                    message.reply("пользователя не существует");
                } else {
                    console.log(`err`, err);
                }
            })
            .then((gm) => {
                // если есть пользователь, то нужно выполнить свод действий
                if (!gm) {
                    return;
                }
                message.reply("пользователь добавлен");
                if (
                    message.channel.members.find(
                        (member) => member.id === kUserId
                    )
                ) {
                    return gm.voice.disconnect("запрос пользователя");
                }
            })

            .catch((err) => {
                console.log(`err`, err);
                message.reply(`ошибка code ${err.code}`);
            });
    },
};
