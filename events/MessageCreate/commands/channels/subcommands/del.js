module.exports = {
    name: "del",
    func: function (models, message, commands) {
        if (commands.length !== 3) {
            return;
        }
        let channelId = commands[2];

        message.guild.channels
            .delete(channelId, "пользователь запросил удаление")
            .then(() => {
                models.AdminChannel.delete(message.guildId, channelId)
                    .then(() => {
                        message.reply(`канал удален `);
                    })
                    .catch(() => {
                        message.reply("ошибка");
                    });
            })
            .catch((err) => {
                console.log(err);
                message.reply("ошибка");
            });
    },
};
