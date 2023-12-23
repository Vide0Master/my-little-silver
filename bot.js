//? MY LITTLE SILVER, тамагочи бот, от VideoMaster

//* подключение ключевых сис. модулей
const cLog = require('./modules/consoleLogger')
const commands = require('./modules/interactions/commands.js')
const menus = require('./modules/interactions/menus.js')
const telemetry = require('./modules/telemetry.js')
const saves = require('./modules/saves/saveInteract.js')
const LI = require('./modules/lines/lineInteract')
const TC = require('./modules/time_calculator')
const flog = require('./modules/fileLogger.js')

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
    flog.createFile()
    cLog(`Произвёл авторизацию как ${client.user.tag}!`, 'i');
    //* попытка запуска модуля статуса
    try {
        require('./modules/Status')(client)
        cLog(`Модуль статуса успешно запущен!`, 's')
    }
    catch (err) { cLog(`Ошибка модуля статуса!\n[${err}]`, 'e') }

    try {
        commands.updateCommands(client)
        cLog(`Модуль комманд успешно запущен!`, 's')
    }
    catch (err) { cLog(`Ошибка модуля комманд!\n[${err}]`, 'e') }

    try {
        menus.registerMenus(client)
        cLog(`Модуль меню успешно запущен!`, 's')
    }
    catch (err) { cLog(`Ошибка модуля комманд!\n[${err}]`, 'e') }

    saves.testAllSaves()

    LI.testAllLanguages()

    cLog('Я запустился!', 'uwu')
})

client.on(Events.InteractionCreate, interaction => {
    telemetry.updateTelemetry(interaction)
    if(saves.testForUser(interaction.user.id)){
        TC(interaction)
    }
    if (interaction.isCommand()) commands.commandExec(interaction);
    if (interaction.isStringSelectMenu()) menus.menuExec(interaction);
});