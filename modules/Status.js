
//* Status от VideoMaster

const LI = require('./lines/LineInteract')
const status = require('./lines/Status.json')
const { ActivityType } = require('discord.js')

module.exports = function (client) {
    setInterval(() => {
        switch (Math.round(Math.random() * 2)) {
            case 0: {
                client.user.setPresence({
                    activities: [{ name: LI.returnRandomLineFrom(status.playing), type: ActivityType.Playing }],
                    status: 'online',
                });
            }; break;
            case 1: {
                client.user.setPresence({
                    activities: [{ name: LI.returnRandomLineFrom(status.watching), type: ActivityType.Watching }],
                    status: 'idle',
                });
            }; break;
            case 2: {
                client.user.setPresence({
                    activities: [{ name: LI.returnRandomLineFrom(status.listening), type: ActivityType.Listening }],
                    status: 'idle',
                });
            }; break;
        }
    }, (1000 * 60 * 10));
}