const Base = require("./Base");

class AdminChannel extends Base {
    constructor(db, models, name) {
        super(db, models, name);
    }
    /**
     * Создание таблицы в базе
     * @returns {Promise}
     */
    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.name} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guildId TEXT NOT NULL,
            adminId TEXT NOT NULL
            )`;
        return this.db.run(sql);
    }

    /**
     * Добавлит в таблицу новый канал
     * @param {*} guildId айди гильдии
     * @param {*} adminId айди админа
     * @returns {Promise}
     */
    create(guildId, adminId) {
        return this.db.run(
            `INSERT INTO ${this.name} (guildId,adminId) VALUES(?,?)`,
            [guildId, adminId]
        );
    }

    /**
     * Удалить из таблицы канал
     * @param {*} guildId айди гильдии
     * @param {*} adminId айди админа
     * @returns {Promise}
     */
    delete(guildId, channelId) {
        return this.db.run(
            `DELETE FROM ${this.name} WHERE (guildId=? AND adminId=?)`,
            [guildId, adminId]
        );
    }

    /**
     * Вернуть канал
     * @param {*} guildId айди гильдии
     * @param {*} adminId айди админа
     * @returns {Promise}
     */
    getChannel(guildId, adminId) {
        return this.db.get(
            `SELECT * FROM ${this.name} WHERE (guildId=? AND adminId=?)`,
            [guildId, adminId]
        );
    }
}

module.exports = AdminChannel;
