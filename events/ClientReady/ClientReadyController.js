class ClientReadyController {
    constructor(db) {
        this.db = db;
    }
    getName() {
        return "clientReadyController";
    }
    async func(client) {
        const d = new Date();
        console.log(
            `[${d.toLocaleString()}]БОТ '${client.user.tag}' готов к работе`
        );
    }
}

module.exports = ClientReadyController;
