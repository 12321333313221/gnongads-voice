module.exports = {
    name: ".kick",
    description: `Функционал для работы с кикам`,
    alias: [".kick", ".kicks", ".kic"],
    subcommands: require("./subcommands"),
    verify: function (str) {
        return this.alias.find((alias) => alias === str);
    },
    hasAccess: function (roles) {
        return true;
    },
    getSubcommand: function (commands) {
        if (commands.length === 2) {
            return this.subcommands.find((act) => act.name === "set");
        }

        return this.subcommands.find((act) => act.name === commands[1]);
    },
};
