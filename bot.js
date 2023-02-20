//? MY LITTLE SILVER, тамагочи бот, от VideoMaster

//* подключение ключевых сис. модулей
//const testbed = require('./modules/TEMPLATE');
const Commands = require('./modules/commands')
const cLog = require('./modules/consoleLogger')

//* подключение библиотек
const { Client, GatewayIntentBits } = require('discord.js');

//* создание клиента "пустышки"
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

//* логин пустышки
const token = require('./config/token.json');
client.login(token);

//* действия бота по готовности
client.on('ready', () => {
    cLog(`Залогинился как ${client.user.tag}!`, 'i');
    //* попытка запуска модуля статуса
    try {
        require('./modules/Status')(client)
        cLog(`Модуль статуса успешно запущен!`, 'g')
    }
    catch (err) { cLog(`Ошибка модуля статуса!\n[${err}]`, 'e') }
});