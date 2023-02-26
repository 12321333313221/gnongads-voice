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
            guildId TEXT,
            categoryId TEXT,
            channelId TEXT,
            creatorId TEXT
            )`;
        return this.db.run(sql);
    }

    /**
     * Добавлит в таблицу новый канал
     * @param {*} guildId айди гильдии
     * @param {*} categoryId айди категории
     * @param {*} channelId айди канала
     * @param {*} creatorId айди создателя
     * @returns {Promise}
     */
    create(guildId, categoryId, channelId, creatorId) {
        return this.db.run(
            `INSERT INTO ${this.name} (guildId,categoryId,channelId,creatorId) VALUES(?,?,?,?)`,
            [guildId, categoryId, channelId, creatorId]
        );
    }

    /**
     * Обновить категорию канала
     * @param {*} guildId айди гильдии
     * @param {*} channelId айди новой категории
     * @param {*} categoryId айди канала
     * @returns {Promise}
     */
    update(guildId, channelId, categoryId) {
        return this.db.run(
            `
        UPDATE ${this.name}
        SET categoryId=?
        WHERE (guildId=? AND channelId=?)
        `,
            [categoryId, guildId, channelId]
        );
    }

    /**
     * Удалить из таблицы канал
     * @param {*} guildId айди гильдии
     * @param {*} channelId айди канала
     * @returns {Promise}
     */
    delete(guildId, channelId) {
        return this.db.run(
            `DELETE FROM ${this.name} WHERE (guildId=? AND channelId=?)`,
            [guildId, channelId]
        );
    }

    /**
     * Вернуть канал
     * @param {*} guildId айди гильдии
     * @param {*} channelId айди канала
     * @returns {Promise}
     */
    getChannel(guildId, channelId) {
        return this.db.get(
            `SELECT * FROM dictionary WHERE (guildId=? AND channelId=?)`,
            [guildId, channelId]
        );
    }
}

module.exports = AdminChannel;