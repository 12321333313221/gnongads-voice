const CommandManager = require("./CommandManager");

class MessageCreateController {
    constructor(db, models) {
        this.db = db;
        this.models = models;
        this.comman = new CommandManager(models);
    }
    func(message) {
        //проверка на бота
        if (
            message.member.user.bot ||
            message.member.id === process.env.APPID
        ) {
            return;
        }
        if (!message.content.startsWith(".")) {
            return;
        }
        this.comman.run(message);
    }
    getName() {
        return "messageCreateController";
    }
}

module.exports = MessageCreateController;
