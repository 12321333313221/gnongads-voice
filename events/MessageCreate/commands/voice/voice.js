module.exports = {
    name: ".voice",
    description: `Функционал для установления лимита установ`,
    alias: [".voice", ".vc"],
    subcommands: require("./subcommands"),
    roles: [],
    verify: function (str) {
        return this.alias.find((alias) => alias === str);
    },
    hasAccess: function (roles) {
        return true;
    },
    getSubcommand: function (str) {
        return this.subcommands.find((act) => act.name === str[1]);
    },
};
