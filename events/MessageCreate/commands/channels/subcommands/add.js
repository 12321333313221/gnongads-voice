const { ChannelType } = require("discord.js");
const Promise = require("bluebird");
module.exports = {
    name: "add",
    func: function (models, message, commands) {
        let categoryId = null;
        let name = "default";
        if (commands.length >= 3) {
            categoryId = commands[2];
        }
        if (commands.length >= 4) {
            let index = message.content.indexOf(commands[2]);
            let size = commands[2].length;
            name = message.content.slice(index + size + 1);
        }
        message.guild.channels
            .create({
                name: name,
                type: ChannelType.GuildVoice,
                parent: categoryId,
                reason: "Обычный канал канал",
            })
            .then((channel) => {
                let createPromise = models.AdminChannel.create(
                    message.guildId,
                    categoryId,
                    channel.id,
                    message.member.id,
                    0
                );
                let channelPromise = new Promise((res, rej) => {
                    res(channel);
                });
                return Promise.all([createPromise, channelPromise]);
            })
            .then((data) => {
                message.reply(`канал создан <#${data[1].id}>`);
            })
            .catch((err) => {
                console.log(err);
                message.reply("ошибка");
            });
    },
};
