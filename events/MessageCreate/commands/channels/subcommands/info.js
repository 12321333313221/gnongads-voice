const { bold, inlineCode } = require("discord.js");
let str = `
Аналоги ".ch", ".channel", ".channels", ".chan"
| ${bold(
    "show - показывает список созданных и существующих через бота каналов"
)}
${inlineCode(".ch show")}

| ${bold("add - добавляет канал на сервер")}
${inlineCode(".ch add <id категории> <название>")}
${inlineCode(".ch add 1077832335682195567 Специальный канал")}

|${bold("link - линкует канал с ботом")}
${inlineCode(".ch link <id канала>")}
${inlineCode(".ch link 1078702200731213915")}
${inlineCode(
    ".ch link -v 1078702200731213915"
)} -v обозначение что это вип канал

| ${bold("del - удаляет канал с сервера")}
${inlineCode(".ch del <id канала>")}
${inlineCode(".ch del 1078702200731213915")}

| ${bold("upd - обновляет категорию канала сервера")}
${inlineCode(".ch upd <id канала> <id категории>")}
${inlineCode(".ch upd 1078702200731213915 1076815654302269482")}

| ${bold("help выводит информацию о функционале")}
${inlineCode(".ch help")}
`;
module.exports = {
    name: "help",
    func: function (models, message, commands) {
        message.reply(str);
    },
};
