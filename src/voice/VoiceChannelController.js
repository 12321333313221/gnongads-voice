const { ChannelType } = require("discord.js");
const VoiceChannelStorage = require("./VoiceChannelStorage");
/**
 * Класс реализации контролера войс каналов
 */
class VoiceChannelController {
    constructor(app) {
        this.app = app;
        this.storage = new VoiceChannelStorage();
    }
    _check(channel) {
        if (!channel) {
            throw Error(`Отсуствует channel = ${channel}`);
        }
        if (channel.type != ChannelType.GuildVoice) {
            throw Error(
                `Тип канал должен быть ${ChannelType.GuildVoice}, а он ${channel.type}`
            );
        }
        return true;
    }
    /**
     * Если пользователь вошел в канал то вывести информацию
     * @param {*} channel объект канала
     */
    join(vs) {
        let channel = vs.channel;
        this._check(channel);

        let admChannel = this.app.models.AdminChannel;
        let userChannel = this.app.models.UserChannel;
        /**
         * Пайплайн такой
         * 1. ищем канал в бд
         */
        admChannel
            .getChannel(channel.guildId, channel.id)
            .then((info) => {
                if (!info) {
                    return;
                }
                return channel.clone({
                    name: `+ ${channel.name}`,
                    type: ChannelType.GuildVoice,
                });
            })
            .then((clone) => {
                if (!clone) {
                    return;
                }
                userChannel.create(
                    clone.guildId,
                    clone.parentId,
                    clone.id,
                    vs.member.id,
                    0
                );
                this.storage.add(clone.id, clone);
                return vs.setChannel(clone);
            })
            .then((gm) => {
                if (!gm) {
                    return;
                }

                console.log(
                    `Пользователь ${gm.user.tag} создал [${gm.voice.channel.name}] [${gm.voice.channel.id}] в [${gm.voice.channel.guildId}]`
                );
            })
            .then()
            .catch((err) => {
                console.log(err);
            });
    }
    left(vs) {
        let channel = vs.channel;
        this._check(channel);

        let userChannel = this.app.models.UserChannel;

        userChannel
            .getChannel(channel.guildId, channel.id)
            .then((info) => {
                if (!info) {
                    return;
                }
                return channel.delete();
            })
            .then((dChannel) => {
                if (!dChannel) {
                    return;
                }
                userChannel.delete(dChannel.guildId, dChannel.id);
                console.log(
                    `Канал был удален [${dChannel.name}] [${dChannel.id}] в [${dChannel.guildId}]`
                );
            })
            .catch((err) => {
                console.log(err);
            });
        // channel.delete();
        // this.storage.delete(channel.id, channel);
    }
}

module.exports = VoiceChannelController;
