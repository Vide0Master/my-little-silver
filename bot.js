//? MY LITTLE SILVER, DISCORD TAMAGOCHI BOT, MADE BY VIDEOMASTER

//* Connecting core modules
//const testbed = require('./modules/TEMPLATE');
const Commands = require('./modules/commands')

//* Requiring some discord libraries
const { Client, GatewayIntentBits } = require('discord.js');

//* Creating empty client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

//* Authentication
const token = require('./config/token.json');
client.login(token);

//* действия бота по готовности
client.on('ready', () => {
    console.log(`Залогинился как ${client.user.tag}!`);
    //* State module startup try
    try { require('./modules/Status')(client) } catch(err) { console.log(`\nОшибка модуля статуса! [${err}]`) }
});
