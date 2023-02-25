class ClientReadyController {
    constructor(db) {
        this.db = db;
    }
    getName() {
        return "clientReadyController";
    }
    func(client) {
        const d = new Date();
        console.log(
            `[${d.toLocaleString()}]\tБОТ '${client.user.tag}' готов к работе`
        );
    }
}

module.exports = ClientReadyController;
