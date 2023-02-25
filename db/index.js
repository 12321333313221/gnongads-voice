const DB = require("./DB");
const db = new DB(process.env.DBPATH);

const { AdminChannel } = require("./models");

AdminChannel.setDB(db);
AdminChannel.createTable();

module.exports = { db: db, models: { AdminChannel } };
