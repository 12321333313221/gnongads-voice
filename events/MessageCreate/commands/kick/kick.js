module.exports = {
    name: ".kick",
    description: `Функционал для работы с кикам`,
    alias: [".kick", ".kicks", ".kic"],
    subcommands: require("./subcommands"),
    verify: function (str) {
        return this.alias.find((alias) => alias === str);
    },
    getSubcommand: function (commands) {
        if (commands.length === 2) {
        }
        if (!isNaN(commands[1])) {
            /** примитивная проверка */
            return this.subcommands.find((act) => act.name === "set");
        }
        return this.subcommands.find((act) => act.name === commands[1]);
    },
};
