//? MY LITTLE SILVER, тамагочи бот, от VideoMaster

//* подключение ключевых сис. модулей
//const testbed = require('./modules/TEMPLATE');
const cLog = require('./modules/consoleLogger')
let Commands;



//* подключение библиотек
const { Client, GatewayIntentBits, Events } = require('discord.js');

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
client.login(require('./config/token.json'));

//* действия бота по готовности
client.on('ready', () => {
    cLog(`Залогинился как ${client.user.tag}!`, 'i');
    //* попытка запуска модуля статуса
    try {
        require('./modules/Status')(client)
        cLog(`Модуль статуса успешно запущен!`, 'g')
    }
    catch (err) { cLog(`Ошибка модуля статуса!\n[${err}]`, 'e') }
    try {
        Commands = require('./modules/interactions/commands/commands')(client)
        cLog(`Модуль комманд успешно запущен!`, 'g')
    }
    catch (err) { cLog(`Ошибка модуля комманд!\n[${err}]`, 'e') }
})

client.on(Events.InteractionCreate, interaction => {
    if (interaction.isCommand()) { Commands(interaction) }
})