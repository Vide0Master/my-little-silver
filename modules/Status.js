
//* Status от VideoMaster

const LI = require('./lines/lineInteract')
const { ActivityType } = require('discord.js')
const GLang = require('../config/techInfo.json').global_lang

module.exports = function (client) {
    setInterval(() => {
        switch (Math.round(Math.random() * 2)) {
            case 0: {
                client.user.setPresence({
                    activities: [{ name: LI.getRandomLine('Status.playing',GLang), type: ActivityType.Playing }],
                    status: 'online',
                });
            }; break;
            case 1: {
                client.user.setPresence({
                    activities: [{ name: LI.getRandomLine('Status.watching',GLang), type: ActivityType.Watching }],
                    status: 'idle',
                });
            }; break;
            case 2: {
                client.user.setPresence({
                    activities: [{ name: LI.getRandomLine('Status.listening',GLang), type: ActivityType.Listening }],
                    status: 'idle',
                });
            }; break;
        }
    }, (1000 * 60 * 10));
}