require("./env");

const { Client, Events, GatewayIntentBits } = require("discord.js");
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

client.on(Events.MessageCreate, (client) => {
    console.log(
        `[${d.toLocaleString()}]\tБОТ '${client.user.tag}' готов к работе`
    );
});
