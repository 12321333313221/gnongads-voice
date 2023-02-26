const DB = require("./DB");
const db = new DB(process.env.DBPATH);

const { AdminChannel, UserChannel } = require("./models");

const models = {};
const adminChannel = new AdminChannel(db, models, "adminChannels");
adminChannel.createTable();
const userChannel = new UserChannel(db, models, "userChannels");
userChannel.createTable();

models["AdminChannel"] = adminChannel;
models["UserChannel"] = userChannel;

module.exports = { db, models };
