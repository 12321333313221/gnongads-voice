const Base = require("./Base");

class AdminChannel extends Base {
    /**
     * Создание таблицы в базе
     * @returns {Promise}
     */
    static createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS ${Base.name} (
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
    static create(guildId, categoryId, channelId, creatorId) {
        return this.db.run(
            `INSERT INTO ${Base.name} (guildId,categoryId,channelId,creatorId) VALUES(?,?,?,?)`,
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
    static update(guildId, channelId, categoryId) {
        return this.db.run(
            `
        UPDATE ${Base.name}
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
    static delete(guildId, channelId) {
        return this.db.run(
            `DELETE FROM ${Base.name} WHERE (guildId=? AND channelId=?)`,
            [guildId, channelId]
        );
    }

    /**
     * Вернуть канал
     * @param {*} guildId айди гильдии
     * @param {*} channelId айди канала
     * @returns {Promise}
     */
    static getChannel(guildId, channelId) {
        return this.db.get(
            `SELECT * FROM dictionary WHERE (guildId=? AND channelId=?)`,
            [guildId, channelId]
        );
    }
}

AdminChannel.setName("adminChannels");

module.exports = AdminChannel;
