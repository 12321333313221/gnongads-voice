const Base = require("./Base");

class KickedUser extends Base {
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
            channelId TEXT,
            creatorId TEXT,
            kickedUserId TEXT
            )`;
        return this.db.run(sql);
    }

    /**
     * Добавлит в таблицу юзера
     * @param {*} guildId айди гильдии
     * @param {*} channelId айди канала
     * @param {*} creatorId айди создателя
     * @param {*} kickedUserId айди кикнутого человека
     * @returns {Promise}
     */
    create(guildId, channelId, creatorId, kickedUserId) {
        return this.db.run(
            `INSERT INTO ${this.name} (guildId,channelId,creatorId,kickedUserId) VALUES(?,?,?,?)`,
            [guildId, channelId, creatorId, kickedUserId]
        );
    }

    /**
     * Удалить из таблицы юзера
     * @param {*} guildId айди гильдии
     * @param {*} channelId айди канала
     * @param {*} kickedUserId айди кикнутого человека
     * @returns {Promise}
     */
    delete(guildId, channelId, kickedUserId) {
        return this.db.run(
            `DELETE FROM ${this.name} WHERE (guildId=? AND channelId=? AND kickedUserId=?)`,
            [guildId, channelId, kickedUserId]
        );
    }
    /**
     * Удалить из таблицы юзера
     * @param {*} guildId айди гильдии
     * @param {*} channelId айди канала

     * @returns {Promise}
     */
    deleteChannel(guildId, channelId, creatorId) {
        return this.db.run(
            `DELETE FROM ${this.name} WHERE (guildId=? AND channelId=? AND creatorId=?)`,
            [guildId, channelId, creatorId]
        );
    }
    /**
     * получить из таблицы юзера
     * @param {*} guildId айди гильдии
     * @param {*} channelId айди канала
     * @param {*} kickedUserId айди кикнутого человека
     * @returns {Promise}
     */
    getKickedUser(guildId, channelId, kickedUserId) {
        return this.db.all(
            `SELECT * FROM  ${this.name} WHERE (guildId=? AND channelId=? AND kickedUserId=?)`,
            [guildId, channelId, kickedUserId]
        );
    }
}

module.exports = KickedUser;
