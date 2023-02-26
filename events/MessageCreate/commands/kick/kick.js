module.exports = {
    name: ".kick",
    description: `Функционал для работы с кикам`,
    alias: [".kick", ".kicks", ".kic"],
    subcommands: require("./subcommands"),
    verify: function (str) {
        return this.alias.find((alias) => alias === str);
    },
    getSubcommand: function (str) {
        return this.subcommands.find((act) => act.name === str);
    },
};
