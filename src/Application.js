const fs = require("node:fs");
const path = require("node:path");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const VoiceChannelController = require("./voice/VoiceChannelController");
class Apllication {
    constructor(client, models, token) {
        this.client = client;
        this.models = models;
        this.token = token;
        this.vc = null;
        this._init();
    }
    _init() {
        this.vc = new VoiceChannelController(this);
        this._initEvents();
        this.client.login(this.token);
    }
    _initEvents() {
        const eventsPath = path.join(__dirname, "events");
        const eventFiles = fs
            .readdirSync(eventsPath)
            .filter((file) => file.endsWith(".js"));
        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if (event.once) {
                this.client.once(event.name, (...args) =>
                    event.execute(this, ...args)
                );
            } else {
                this.client.on(event.name, (...args) =>
                    event.execute(this, ...args)
                );
            }
        }
    }
}

module.exports = Apllication;
