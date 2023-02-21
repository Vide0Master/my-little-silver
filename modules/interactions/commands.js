
//* Commands от VideoMaster

const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const cLog = require('../consoleLogger')



class Commands {
    static async updateCommands(client) {
        client.commands = new Collection();

        const commandsPath = path.join(__dirname, './commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const commandF = require(filePath);
            if ('command' in commandF && 'execute' in commandF) {
                client.commands.set(commandF.command.name, commandF);
                client.application.commands.create(commandF.command)
            } else {
                cLog(`Комманда ${file} не была загружена`, 'w')
            }
        }

        const coms = await client.application.commands.fetch()
        coms.forEach(element => {
            if (!client.commands.get(element.name)) {
                client.application.commands.delete(element.id)
            }
        });
    }
    static async commandExec(interaction){
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            cLog(`Комманда ${interaction.commandName} не найдена!`,'e')
            return;
        }
    
        try {
            await command.execute(interaction);
        } catch (error) {
            cLog(`Произошла непредвиденная ошибка!\n[${error}]`)
            await interaction.reply({ content: 'Произошла ошибка обработки комманды!', ephemeral: true });
        }
    }
}

module.exports = Commands;