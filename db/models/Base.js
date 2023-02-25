class Base {
    static db;

    static setDB(db) {
        if (!db) {
            throw Error("DB пустая");
        }
        Base.db = db;
    }
    static name;
    static setName(name) {
        if (!name) {
            throw Error("Имя пустое");
        }
        Base.name = name;
    }
    /**
     * Возврат всех объектов из базы
     * @returns {Promise}
     */
    static getAll() {
        return Base.db.all(`SELECT * FROM ${Base.name}`);
    }
    /**
     * Возврат всех объектов по гильдии
     * @param {*} guildId айди гильдии
     * @returns {Promise}
     */
    static getByGuildId(guildId) {
        return Base.db.all(`SELECT * FROM ${Base.name} where guildId=?`, [
            guildId,
        ]);
    }
}

module.exports = Base;
