
//* Commands от VideoMaster

//* подключение библиотеки
const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const cLog = require('../consoleLogger')
const LI = require('../lines/lineInteract')
const SI = require('../saves/saveInteract')

class Commands {
    //* обновить комманды бота
    static async updateCommands(client) {
        client.commands = new Collection();

        const commandsPath = path.join(__dirname, './commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        let l_commands = { l: [], e: [] }
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const commandF = require(filePath);
            if ('command' in commandF && 'execute' in commandF && 'settings' in commandF && commandF.settings.active) {
                client.commands.set(commandF.command.name, commandF);
                client.application.commands.create(commandF.command)
                l_commands.l.push(file.slice(0, -3))
            } else {
                l_commands.e.push(file.slice(0, -3))
            }
        }
        l_commands.l.length != 0 ? cLog(`Загруженные комманды: ${l_commands.l}`, 'i') : cLog(`НИ ОДНОЙ КОММАНДЫ НЕ БЫЛО ЗАГРУЖЕНО!`, 'e')
        l_commands.e.length != 0 ? cLog(`Не загружены комманды: ${l_commands.e}`, 'w') : {}

        const coms = await client.application.commands.fetch()
        coms.forEach(element => {
            if (!client.commands.get(element.name)) {
                client.application.commands.delete(element.id)
            }
        });
    }
    //* исполнить комманду
    static async commandExec(interaction) {
        const command = interaction.client.commands.get(interaction.commandName);
        const lpack = LI.getLine("system.interactions.interaction_err", SI.getSave(interaction.user.id).user.settings.lang)
        if (!command) {
            cLog(`Комманда ${interaction.commandName} не найдена!`, 'e')
            return;
        }

        try {
            if (interaction.inGuild() && !command.settings.public) {
                interaction.reply({ content: lpack.DM_call, ephemeral: true })
            } else {
                await command.execute(interaction);
            }
        } catch (error) {
            cLog(`Произошла непредвиденная ошибка [${error}] в комманде [${interaction.commandName}]!`, 'e')
            await interaction.reply({ content: lpack.CMND_err, ephemeral: true });
        }
    }
}

module.exports = Commands;