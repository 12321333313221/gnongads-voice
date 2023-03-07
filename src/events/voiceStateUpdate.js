const { Events } = require("discord.js");

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(app, oldState, newState) {
        if (!newState.channelId && oldState.channelId) {
            /**
             * человек вышел с войс канала
             */
            app.vc.left(oldState);
        } else if (
            oldState.channelId &&
            newState.channelId &&
            oldState.channelId != newState.channelId
        ) {
            /**
             * человек перешел из войс канала в канал
             * при изменении самого войс стейта пример (вкл/выкл) микро
             * срабатывает этот же скрипт
             */
            app.vc.left(oldState);
            app.vc.join(newState);
        } else if (newState.channelId) {
            /**
             * человек зашел в новый войс канал
             */
            app.vc.join(newState);
        }
    },
};
