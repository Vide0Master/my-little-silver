
//* Telemetry от VideoMaster

const save = require('./saves/saveInteract')

class telemetry {
    static updateTelemetry(interaction) {
        let file = save.getSave(interaction.user.id)
        if (interaction.isCommand()) {
            if (file.telemetry.commandsExecuted[interaction.commandName] === undefined) {
                file.telemetry.commandsExecuted[interaction.commandName] = 1
            } else {
                file.telemetry.commandsExecuted[interaction.commandName] += 1
            }
            save.setSave(interaction.user.id, file)
        }
        if (interaction.isStringSelectMenu()) {
            if (file.telemetry.menusExecuted[interaction.customId] === undefined) {
                file.telemetry.menusExecuted[interaction.customId] = 1
            } else {
                file.telemetry.menusExecuted[interaction.customId] += 1
            }
            save.setSave(interaction.user.id, file)
        }
    }
}
module.exports = telemetry
//* переработать всю блять телеметрию...