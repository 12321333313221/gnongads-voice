module.exports = {
    name: ".voice",
    description: `Функционал для установления лимита установ`,
    alias: [".voice", ".vc"],
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
    getSubcommand: function (str) {
        return this.subcommands.find((act) => act.name === str[1]);
    },
};
