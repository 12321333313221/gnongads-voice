const { ChannelType } = require("discord.js");
const Promise = require("bluebird");
module.exports = {
    name: "link",
    func: function (models, message, commands) {
        let categoryId = null;
        let id = "default";
        message.guild.channels
            .fetch(commands[2])
            .then((channel) => {
                //console.log(channel);
                let addPromise = models.AdminChannel.create(
                    message.guildId,
                    channel.parentId,
                    channel.id,
                    message.member.id
                );
                let channelPromise = new Promise((res, rej) => {
                    res(channel);
                });
                return Promise.all([addPromise, channelPromise]);
            })
            .then((data) => {
                message.reply(`канал прилинкован <#${data[1].id}>`);
            })
            .catch((err) => {
                switch (err.code) {
                    case 10003:
                        message.reply(`Неверный канал`);
                        break;
                    case 50035:
                        message.reply("Возможно вы хотели ввести id канала");
                        break;
                    default:
                        let erroNum = Math.floor(
                            Math.random() * (999999 - 100000) + 100000
                        );
                        console.log(`[${erroNum}]`, err);
                        message.reply(
                            `Ошибка [${erroNum}] сообщите этот номер администрации`
                        );
                        break;
                }
            });

        //.then(() => {});
    },
};
