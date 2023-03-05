module.exports = {
    name: ".kick",
    description: `Функционал для работы с кикам`,
    alias: [".kick", ".kicks", ".kic"],
    subcommands: require("./subcommands"),
    roles: ["1078705130972647565", "1081615301738766392", "954393422716879019"],
    verify: function (str) {
        return this.alias.find((alias) => alias === str);
    },
    hasAccess: function (roles) {
        return roles.find((role) =>
            this.roles.find((trole) => role.id === trole)
        );
    },
    getSubcommand: function (commands) {
        if (commands.length === 2) {
            return this.subcommands.find((act) => act.name === "set");
        }

        return this.subcommands.find((act) => act.name === commands[1]);
    },
};
