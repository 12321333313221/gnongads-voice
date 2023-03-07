const DB = require("./DB");
const db = new DB(process.env.DBPATH);

const {
    AdminChannel,
    UserChannel,
    KickedUser,
    AdminRole,
} = require("./models");

const models = {};
const adminChannel = new AdminChannel(db, models, "adminChannels");
adminChannel.createTable();

const userChannel = new UserChannel(db, models, "userChannels");
userChannel.createTable();

const kickedUser = new KickedUser(db, models, "kickedUsers");
kickedUser.createTable();

const adminRole = new AdminRole(db, models, "adminRoles");
adminRole.createTable();

models["AdminChannel"] = adminChannel;
models["UserChannel"] = userChannel;
models["KickedUser"] = kickedUser;
models["AdminRole"] = adminRole;

module.exports = { db, models };
