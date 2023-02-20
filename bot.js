//? MY LITTLE SILVER, тамагочи бот, от VideoMaster

//* подключение ключевых сис. модулей
//const testbed = require('./modules/TEMPLATE');
const Commands = require('./modules/commands')

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
    console.log(`Залогинился как ${client.user.tag}!`);
    //* попытка запуска модуля статуса
    try { require('./modules/Status')(client) }
    catch (err) { console.log(`\n\x1b[31mОшибка модуля статуса! [${err}]\x1b[0m`) }
    finally { console.log(`\n\x1b[32m Модуль статуса успешно запущен!\x1b[0m`) }
});
