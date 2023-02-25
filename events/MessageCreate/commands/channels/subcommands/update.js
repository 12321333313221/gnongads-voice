module.exports = {
    name: "upd",
    func: function (models, message, commands) {
        let channelId = commands[2];
        let categoryId = commands[3];
        message.guild.channels
            .fetch(channelId)
            .then((channel) => {
                channel
                    .setParent(categoryId)
                    .then((channel) => {
                        models.AdminChannel.update(
                            message.guildId,
                            channel.id,
                            categoryId
                        )
                            .then(() => {
                                message.reply("успех");
                            })
                            .catch((err) => {
                                console.log(err);
                                message.reply("ошибка");
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        message.reply("Неудача при изменении категории");
                    });
            })
            .catch((err) => {
                console.log(err);
                message.reply("канал с таким айди не найден");
            });
    },
};
