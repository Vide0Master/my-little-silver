
//* Telemetry от VideoMaster

const save = require('./saves/saveInteract')

class telemetry {
    static updateTelemetry(interaction) {
        if (!save.testForUser(interaction.user.id)) {
            save.createSave(interaction.user.id)
        }
        if (interaction.isCommand()) {
            let file = save.getSave(interaction.user.id)
            if (file.telemetry.commandsExecuted[interaction.commandName] === undefined) {
                file.telemetry.commandsExecuted[interaction.commandName] = 1
            } else {
                file.telemetry.commandsExecuted[interaction.commandName] += 1
            }
            save.setSave(interaction.user.id, file)
        }
        if (interaction.isStringSelectMenu()) {

        }

    }
}
module.exports = telemetry
//* переработать всю блять телеметрию...