require("./env");
const { db, models } = require("./db");

const { Client, Events, GatewayIntentBits } = require("discord.js");
const EventManager = require("./events/EventManager");
const evman = new EventManager(db, models);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.login(process.env.TOKEN);

client.on(Events.ClientReady, evman.clientReadyController);
client.on(Events.MessageCreate, evman.messageCreateController);
client.on(Events.VoiceStateUpdate, evman.voiceStateUpdateController);
