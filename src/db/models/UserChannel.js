const Base = require("./Base");
class UserChannel extends Base {
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
            creatorId TEXT,
            isVip BOOLEAN
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
    create(guildId, categoryId, channelId, creatorId, isVip) {
        return this.db.run(
            `INSERT INTO ${this.name} (guildId,categoryId,channelId,creatorId,isVip) VALUES(?,?,?,?,?)`,
            [guildId, categoryId, channelId, creatorId, isVip]
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
            `SELECT * FROM  ${this.name} WHERE (guildId=? AND channelId=?)`,
            [guildId, channelId]
        );
    }
    /**
     * вернуть канал по создателю
     * @param {*} guildId
     * @param {*} creatorId
     * @returns
     */
    getChannelsByCreatorId(guildId, creatorId) {
        return this.db.all(
            `SELECT * FROM  ${this.name} WHERE (guildId=? AND creatorId=?)`,
            [guildId, creatorId]
        );
    }
}
module.exports = UserChannel;
