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
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: [PermissionFlagsBits.SendMessages],
                },
            ],
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
                    allow: [PermissionFlagsBits.SendMessages],
                },
                {
                    id: guild.roles.everyone.id,
                    deny: [PermissionFlagsBits.SendMessages],
                },
            ],
            reason: "Клиент запросил вип канал",
        });
    }
    createPersonalVoiceChannel(guild, name, member) {
        return guild.channels.create({
            name: name,
            type: ChannelType.GuildVoice,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: [
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ManageChannels,
                    ],
                },
                {
                    id: guild.roles.everyone.id,
                    deny: [PermissionFlagsBits.SendMessages],
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
        let guildId = oldState.guild.id;

        return this.models.UserChannel.getChannel(guildId, oldState.channel.id)
            .then((channel) => {
                if (!channel) {
                    return;
                }
                if (oldState.channel.members.size != 0) {
                    return;
                }

                let dvcPromise = this.deleteVoiceChannel(
                    oldState.guild,
                    channel.channelId
                );
                let dPromise = this.models.UserChannel.delete(
                    channel.guildId,
                    channel.channelId
                );
                let dcPromise = this.models.KickedUser.deleteByCreatorId(
                    oldState.guild.id,
                    oldState.channelId,
                    oldState.member.id
                );
                let customPromise = new Promise((resolve, reject) => {
                    resolve(channel);
                });
                return Promise.all([
                    dvcPromise,
                    dPromise,
                    dcPromise,
                    customPromise,
                ]);
            })
            .then((data) => {
                if (!data) {
                    return;
                }
                let channel = data[3];
                console.log(
                    ` удален канал гильдии [${channel.guildId}] канал [${channel.channelId}] юзером [${channel.creatorId}] `
                );
            })

            .catch((err) => console.log("err ", err));
    }
    processCreateChannel(oldState, newState) {
        return this.models.AdminChannel.getAll(newState.guild.id).then(
            (data) => {
                let findedChannel = data.find(
                    (channel) => channel.channelId === newState.channelId
                );
                if (findedChannel) {
                    let func = this.createVoiceChannel;
                    let memberVip = newState.member.roles.cache.find((role) => {
                        let vips = [
                            "1078705130972647565",
                            "1081615301738766392",
                        ];
                        for (let i = 0; i < vips.length; i++) {
                            if (vips[i] === role.id) {
                                return true;
                            }
                        }
                    });
                    if (memberVip) {
                        func = this.createVipVoiceChannel;
                    }
                    if (memberVip && findedChannel.isVip === 1) {
                        func = this.createPersonalVoiceChannel;
                    } else if (findedChannel.isVip === 1) {
                        newState.member.voice.disconnect(
                            "пользователь запросил кик"
                        );
                        return;
                    }
                    let name = "● " + newState.channel.name.replace("➕", "");

                    func(newState.guild, name, newState.member)
                        .then((channel) => {
                            return channel.setParent(
                                newState.channel.parentId,
                                {
                                    lockPermissions: false,
                                }
                            );
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
            }
        );
    }
    weNeedDisconnect(guildId, channelId, member) {
        return this.models.KickedUser.getKickedUser(
            guildId,
            channelId,
            member.id
        ).then((data) => {
            if (data.length === 0) {
                return;
            }
            console.log(
                `[${guildId}] ${member.user.tag}[ ${member.id}] был кикнут из ${channelId}`
            );
            member.voice.disconnect("пользователь запросил кик");
        });
    }
    async func(oldState, newState) {
        /**
         * ИНФОРМАЦИЯ
         * есть 3 события
         * 1. пользователь вышел из войс канала
         * 2. пользователь перешл из канала в канал
         * 3. пользователь зашел в войс канал
         */

        if (!newState.channelId && oldState.channelId) {
            /**
             * человек вышел с войс канала
             */
            this.processDeleteChannel(oldState, newState);
        } else if (
            oldState.channelId &&
            newState.channelId &&
            oldState.channelId != newState.channelId
        ) {
            /**
             * человек перешел из войс канала в канал
             */

            this.weNeedDisconnect(
                newState.guild.id,
                newState.channelId,
                newState.member
            )
                .then(() => {
                    return this.processDeleteChannel(oldState, newState);
                })
                .then(() => {
                    return this.processCreateChannel(oldState, newState);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (newState.channelId) {
            /**
             * человек зашел в новый войс канал
             */
            this.weNeedDisconnect(
                newState.guild.id,
                newState.channelId,
                newState.member
            )
                .then(() => {
                    return this.processCreateChannel(oldState, newState);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}

module.exports = VoiceStateUpdateController;
