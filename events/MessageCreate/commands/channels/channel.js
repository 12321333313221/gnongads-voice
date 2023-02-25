module.exports = {
    name: ".ch",
    description: `Функционал для работы с каналами`,
    alias: [".ch", ".channel", ".channels", ".chan"],
    subcommands: require("./subcommands"),
    verify: function (str) {
        return this.alias.find((alias) => alias === str);
    },
    getSubcommand: function (str) {
        return this.subcommands.find((act) => act.name === str);
    },
};
