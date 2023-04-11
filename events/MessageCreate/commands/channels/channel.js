module.exports = {
    name: ".ch",
    description: `Функционал для работы с каналами`,
    alias: [".ch", ".channel", ".channels", ".chan"],
    subcommands: require("./subcommands"),
    roles: [
        "1008954835913162752",
        "812667192104583218",
        "827202390682894358",
        "1077832145566965793",
        "1081615301961064572",
        "740591998297440339",
        "740591998297440339",
    ],
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
