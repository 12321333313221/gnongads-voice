const { ChannelType } = require("discord.js");
const Promise = require("bluebird");
module.exports = {
    name: "unlink",
    func: function (models, message, commands) {
        let slicerIndex = 2;

        let array = commands.slice(slicerIndex);
        array.forEach((id) => {
            message.guild.channels
                .fetch(id)
                .then((channel) => {
                    //console.log(channel);
                    let addPromise = models.AdminChannel.delete(
                        message.guildId,
                        channel.id
                    );
                    let channelPromise = new Promise((res, rej) => {
                        res(channel);
                    });
                    return Promise.all([addPromise, channelPromise]);
                })
                .then((data) => {
                    message.reply(`канал отлинкован <#${data[1].id}>`);
                })
                .catch((err) => {
                    switch (err.code) {
                        case 10003:
                            message.reply(`Неверный канал`);
                            break;
                        case 50035:
                            message.reply(
                                "Возможно вы хотели ввести id канала"
                            );
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
        });

        //.then(() => {});
    },
};
