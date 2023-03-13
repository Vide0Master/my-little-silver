
//* Menus от VideoMaster

const { Collection } = require('discord.js'); 
const fs = require('node:fs');
const path = require('node:path');
const cLog = require('../consoleLogger')



class Menus {
    static async registerMenus(client) { 
        client.menus = new Collection();

        const menusPath = path.join(__dirname, './menus');
        const menusFiles = fs.readdirSync(menusPath).filter(file => file.endsWith('.js'));

        for (const file of menusFiles) {
            const filePath = path.join(menusPath, file);
            const menuF = require(filePath);
            if ('execute' in menuF) {
                client.menus.set(file.slice(0,-3), menuF);
                cLog(`Файл меню ${file} загружен.`, 'i')
            } else {
                cLog(`Файл меню ${file} не был загружен!`, 'e')
            }
        }
    }
    static async menuExec(interaction){
        const menu = interaction.client.menus.get(interaction.customId);

        if (!menu) {
            cLog(`Файл меню ${interaction.customId} не найден!`,'e')
            return;
        }

        try {
        await menu.execute(interaction);
        } catch (error) {
            cLog(`Произошла непредвиденная ошибка [${error}] в меню [${interaction.menuName}]!`,'e')
            await interaction.reply({ content: 'Произошла ошибка обработки файла меню, сообщите об этом разработчику!', ephemeral: true }); 
        }
    }
}

module.exports = Menus;