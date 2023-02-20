//* подключение стандартных node.js библиотек
const fs = require('fs');
const path = require('path');

//* подключение модулей
//const testbed = require('./modules/TEMPLATE');
const Commands = require('./modules/commands')

//* подключение библиотеки discord.js для "намерений" и главной библиотеки клиента
const { Client, GatewayIntentBits } = require('discord.js');

//* создание нового "клиента"
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

//* авторизация
const token = require('./config/token.json');
client.login(token);

//* действия бота по готовности
client.on('ready', () => {
    console.log(`Залогинился как ${client.user.tag}!`);
    //* попытка запуска модуля статуса
    try { require('./modules/Status')(client) } catch(err) { console.log(`\nОшибка модуля статуса! [${err}]`) }
});
