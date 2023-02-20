
//* Commands от VideoMaster

async function getCommands(){
    return await client.application.commands.fetch();
}
const commandsOnline = getCommands();
const commandsOffline = require('./commandsList.json').filter(function(i){if(i.active){return i.name}})

require('./commandsList.json').forEach((item)=>{

})

module.exports = function(interaction){

};