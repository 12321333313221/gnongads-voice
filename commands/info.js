const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("info").setDescription("Get info"),
    async execute(interaction) {
        await interaction.reply("War thunder community bot");
    },
};
