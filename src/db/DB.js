const sqlite3 = require("sqlite3");
const Promise = require("bluebird");

/**
 * Класс создает конект с бд и позволяет с ней работать
 */
class DB {
    /**
     * Конструктор класса DB, позволяет общаться с базой данных
     * @constructor
     * @param {string} dbPath путь к файлу
     */
    constructor(dbPath) {
        if (!dbPath) {
            throw new Error("не указан путь к базе данных");
        }
        this.dbPath = dbPath;
        this.db = new sqlite3.Database(this.dbPath, (err) => {
            if (err) {
                console.log("Нет коннекта к базе", err);
            } else {
                console.log("Успешный коннект c бд ", this.dbPath);
            }
        });
    }
    /**
     * Позволяет запустить sql запрос, для функций INSERT,UPDATE и DELETE
     * @param {string} sql запрос на выполнение
     * @param {Array} params параметры
     * @returns {Promise} возвращает обещание Promise из библиотеки bluebird
     */
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log(`Error DB.run ${sql}\n${err}`);
                    reject(err);
                } else {
                    resolve({ id: this.lastId });
                }
            });
        });
    }

    /**
     * Позволяет запустить sql запрос, для функций SELECT c возвратом одной строки
     * @param {string} sql запрос на выполнение
     * @param {Array} params параметры
     * @returns {Promise} возвращает обещание Promise из библиотеки bluebird
     */
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log(`Error DB.get ${sql}\n${err}`);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    /**
     * Позволяет запустить sql запрос, для функций SELECT с возвратом множества строк
     * @param {string} sql запрос на выполнение
     * @param {Array} params параметры
     * @returns {Promise} возвращает обещание Promise из библиотеки bluebird
     */
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log(`Error DB.all ${sql}\n${err}`);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = DB;
