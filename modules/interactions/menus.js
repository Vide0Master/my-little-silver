
//* Menus от Anirunahs

const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const cLog = require('../consoleLogger')



class Menus {
    static async registerMenus(client) {
        client.menus = new Collection();

        const menusPath = path.join(__dirname, './menus');
        const menusFiles = fs.readdirSync(menusPath).filter(file => file.endsWith('.js'));

        let l_menus = { l: [], e: [] }
        for (const file of menusFiles) {
            const filePath = path.join(menusPath, file);
            const menuF = require(filePath);
            if ('execute' in menuF) {
                client.menus.set(file.slice(0, -3), menuF);
                l_menus.l.push(file)
            } else {
                l_menus.e.push(file)
            }
        }

        l_menus.l.length != 0 ? cLog(`Загруженные меню: ${l_menus.l}`, 'i') : cLog(`НИ ОДНОГО МЕНЮ НЕ БЫЛО ЗАГРУЖЕНО!`, 'e')
        l_menus.e.length != 0 ? cLog(`Не загружены меню: ${l_menus.e}`, 'i') : {}
    }
    static async menuExec(interaction) {
        const menu = interaction.client.menus.get(interaction.customId);

        if (!menu) {
            cLog(`Файл меню ${interaction.customId} не найден!`, 'e')
            return;
        }

        try {
            await menu.execute(interaction);
        } catch (error) {
            cLog(`Произошла непредвиденная ошибка [${error}] в меню [${interaction.menuName}]!`, 'e')
            await interaction.reply({ content: 'Произошла ошибка обработки файла меню, сообщите об этом разработчику!', ephemeral: true });
        }
    }
}

module.exports = Menus;