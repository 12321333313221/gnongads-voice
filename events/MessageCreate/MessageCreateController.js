const CommandManager = require("./CommandManager");

class MessageCreateController {
    constructor(db, models) {
        this.db = db;
        this.models = models;
        this.comman = new CommandManager(models);
    }
    async func(message) {
        try {
            //проверка на бота
            if (
                !message.member ||
                message.member.user.bot ||
                message.member.id === process.env.APPID
            ) {
                return;
            }
            if (!message.content.startsWith(".")) {
                return;
            }
            this.comman.run(message);
        } catch (err) {
            console.log(err);
        }
    }
    getName() {
        return "messageCreateController";
    }
}

module.exports = MessageCreateController;
