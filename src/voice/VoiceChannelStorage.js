/**
 * Реализация хранилища каналов, сюда будут залетать все живые каналы
 * @class
 */
class VoiceChannelStorage {
    /**
     *
     * Создается один раз и инициализирует объект storage
     */
    constructor() {
        this.storage = new Map();
    }
    /**
     * Добавляет канал с параметрами
     * @param {*} channelId id канала
     * @param {*} data данные канала
     */
    add(channelId, data) {
        this.storage.set(channelId, data);
    }
    /**
     * Удалить канал
     * @param {*} channelId id канала
     * @returns {Boolean} вернет true если успешно удалил
     */
    delete(channelId) {
        return this.storage.delete(channelId);
    }
    /**
     * Получить канал
     * @param {*} channelId id канала
     * @returns {*} вернет объект что там хранится
     */
    get(channelId) {
        return this.storage.get(channelId);
    }
}

module.exports = VoiceChannelStorage;
