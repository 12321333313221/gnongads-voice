const clientReady = require("./ClientReady");
const messageCreate = require("./MessageCreate");

class EventManager {
    constructor(db, models) {
        this.db = db;
        this.models = models;
        this.addController(new clientReady(this.db));
        this.addController(new messageCreate(this.db, this.models));
    }
    addController(controller) {
        this[controller.getName()] = controller.func.bind(controller);
    }
}

module.exports = EventManager;
