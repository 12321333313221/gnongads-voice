class Base {
    constructor(db, models, name = "") {
        this.db = db;
        this.models = models;
        this.name = name;
    }

    setDB(db) {
        if (!db) {
            throw Error("DB пустая");
        }
        this.db = db;
    }
    setName(name) {
        if (!name) {
            throw Error("Имя пустое");
        }
        this.name = name;
    }

    /**
     * Возврат всех объектов по гильдии
     * @param {*} guildId айди гильдии
     * @returns {Promise}
     */
    getAll(guildId) {
        return this.db.all(`SELECT * FROM ${this.name} where guildId=?`, [
            guildId,
        ]);
    }
}

module.exports = Base;
