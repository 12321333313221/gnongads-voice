const { ChannelType, PermissionFlagsBits } = require("discord.js");
const Promise = require("bluebird");
class VoiceStateUpdateController {
    constructor(db, models) {
        this.db = db;
        this.models = models;
    }
    getName() {
        return "voiceStateUpdateController";
    }
    createVoiceChannel(guild, name) {
        return guild.channels.create({
            name: name,
            type: ChannelType.GuildVoice,
            reason: "Клиент запросил простой канал",
        });
    }
    createVipVoiceChannel(guild, name, member) {
        return guild.channels.create({
            name: name,
            type: ChannelType.GuildVoice,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: [
                        PermissionFlagsBits.ManageChannels,
                        PermissionFlagsBits.ManageRoles,
                    ],
                },
            ],
            reason: "Клиент запросил вип канал",
        });
    }
    setParent(channel, parentId) {
        return channel.setParent(parentId);
    }
    deleteVoiceChannel(guild, id) {
        return guild.channels.delete(id, "создатель покинул чат");
    }

    processDeleteChannel(oldState, newState) {
        let guildId = oldState.guild.id,
            creatorId = oldState.member.id;
        this.models.UserChannel.getChannelsByCreatorId(guildId, creatorId)
            .then((data) => {
                let channel = data.find(
                    (channel) => channel.channelId === oldState.channelId
                );
                if (!channel) {
                    return;
                }
                this.deleteVoiceChannel(oldState.guild, channel.channelId)
                    .then(() => {
                        console.log(
                            ` удален канал гильдии [${channel.guildId}] канал [${channel.channelId}] юзером [${channel.creatorId}] `
                        );
                        return this.models.UserChannel.delete(
                            channel.guildId,
                            channel.channelId
                        );
                    })
                    .catch((err) => console.log("err ", err));
            })

            .catch((err) => console.log("err ", err));
    }
    processCreateChannel(oldState, newState) {
        this.models.AdminChannel.getAll(newState.guild.id).then((data) => {
            if (
                data.find((channel) => channel.channelId === newState.channelId)
            ) {
                let func = this.createVoiceChannel;
                if (
                    newState.member.roles.cache.find(
                        (role) => role.id === "1078705130972647565"
                    )
                ) {
                    func = this.createVipVoiceChannel;
                }
                func(newState.guild, newState.channel.name, newState.member)
                    .then((channel) => {
                        return channel.setParent(newState.channel.parentId, {
                            lockPermissions: false,
                        });
                    })
                    .then((channel) => {
                        return new Promise(function (res, rej) {
                            newState
                                .setChannel(channel)
                                .then(function (guildMember) {
                                    res({ channel, guildMember });
                                })
                                .catch((err) => rej(err));
                        });
                    })
                    .then((obj) => {
                        console.log(
                            ` создан канал гильдии [${obj.guildMember.guild.id}] канал [${obj.channel.id}] [${obj.channel.name}] юзером [${obj.guildMember.id}] ${obj.guildMember.user.tag}`
                        );
                        return this.models.UserChannel.create(
                            newState.guild.id,
                            newState.channel.parentId,
                            obj.channel.id,
                            obj.guildMember.id,
                            false
                        );
                    })
                    .catch((err) => {
                        console.log("err", err);
                    });
            }
        });
    }
    func(oldState, newState) {
        /**
         * ИНФОРМАЦИЯ
         * есть 3 события
         * 1. пользователь вышел из войс канала
         * 2. пользователь перешл из канала в канал
         * 3. пользователь зашел в войс канал
         */

        if (!newState.channelId) {
            /**
             * человек вышел с войс канала
             */
            this.processDeleteChannel(oldState, newState);
        } else if (oldState.channelId && newState.channelId) {
            /**
             * человек перешел из войс канала в канал
             */
            this.processDeleteChannel(oldState, newState);
            this.processCreateChannel(oldState, newState);
            console.log("change");
        } else if (newState.channelId) {
            /**
             * человек зашел в новый войс канал
             */

            this.processCreateChannel(oldState, newState);
        }
    }
}

module.exports = VoiceStateUpdateController;
