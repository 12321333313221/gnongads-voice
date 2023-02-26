class CommandManager {
    constructor(models) {
        this.models = models;
        this.mainCommands = require("./commands");
        this.incorrectCommand = `Неверная команда`;
    }
    run(message) {
        // преобразования
        let str = message.content.replace(/ +/g, " ").trim();
        let commands = str.split(" ");

        // выяснения функции
        let commandObj = null;
        for (let i = 0; i < this.mainCommands.length; i++) {
            if (this.mainCommands[i].verify(commands[0])) {
                commandObj = this.mainCommands[i];
            }
        }
        if (!commandObj) {
            message.reply(this.incorrectCommand);
            return null;
        }

        commandObj = commandObj.getSubcommand(commands[1]);
        if (!commandObj) {
            message.reply(this.incorrectCommand);
            return null;
        }
        commandObj.func(this.models, message, commands);
    }
}

module.exports = CommandManager;