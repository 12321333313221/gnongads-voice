const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(app, client) {
        const d = new Date();
        console.log(
            `[${d.toLocaleString()}]БОТ '${client.user.tag}' готов к работе`
        );
    },
};
