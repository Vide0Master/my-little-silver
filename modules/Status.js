const LI = require('./lines/LineInteract')
const status = require('./lines/Status.json')
const {ActivityType} = require('discord.js')

let interval=0;
function intervalUpdate(){
    interval = (1000*60*5)+(Math.random()*(1000*60*55))
}

module.exports=function(client){
    setInterval(() => {
        switch(Math.round(Math.random()*2)){
            case 0:{
                client.user.setPresence({
                    activities: [{ name: LI.returnRandomLineFrom(status.playing), type: ActivityType.Playing }],
                    status: 'online',
                });
            };break;
            case 1:{
                client.user.setPresence({
                    activities: [{ name: LI.returnRandomLineFrom(status.watching), type: ActivityType.Watching }],
                    status: 'idle',
                });
            };break;
            case 2:{
                client.user.setPresence({
                    activities: [{ name: LI.returnRandomLineFrom(status.listening), type: ActivityType.Listening }],
                    status: 'idle',
                });
            };break;
        }
        intervalUpdate()
    }, interval);
}