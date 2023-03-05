module.exports = {
    name: "show",
    func: function (models, message, commands) {
        models.AdminChannel.getAll(message.guildId).then((data) => {
            let array = [];
            if (data.length === 0) {
                message.reply("Каналов нет");
                return;
            }
            for (let i = 0; i < data.length; i++) {
                let str = `| categoryId = ${data[i].categoryId} | channelId = ${data[i].channelId} | creatorId = ${data[i].creatorId}`;
                array.push(str);
            }
            message.reply(array.join("\n"));
        });
    },
};
