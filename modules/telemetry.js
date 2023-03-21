
//* Telemetry от VideoMaster

const save = require('./saves/saveInteract')

class telemetry{
    static updateTelemetry(interaction){
        if(!save.testForUser(interaction.user.id)){
            save.createSave(interaction.user.id)
        }
        if (interaction.isCommand()) {
            let file = save.getSave(interaction.user.id,'telemetry')
            eval(`file.commandsExecuted.${interaction.commandName} += 1`)
            save.setSave(interaction.user.id,'telemetry',file)
        }
        if (interaction.isStringSelectMenu()) {
            
        }

    }
}

module.exports = telemetry