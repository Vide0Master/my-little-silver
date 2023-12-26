
//* Save Interaction от Anirunahs & VideoMaster

//*подключение библиотек и функций
const fs = require('fs');
const cLog = require('../consoleLogger')
const TI = require('../../config/techInfo.json')

class saveInteraction {

    //* получение файла сохранения по id пользователя и типу файла сохранения
    static getSave(id) {
        let sv = require(`../../${TI.saveDB}/${id}.json`)
        return sv
    }
    //* обновление файла сохранения новыми данными
    static setSave(id, data) {
        fs.writeFileSync(`${TI.saveDB}/${id}.json`, JSON.stringify(data))
    }
    //* создание сохранения пользователя
    static createSave(id) {
        if (!saveInteraction.testForUser(id)) {
            fs.writeFileSync(`${TI.saveDB}/${id}.json`, JSON.stringify(require(`./version_modules/${TI.ver}.js`).ST))
            cLog(`Зарегестрирован новый пользователь, id:${id}`, 'i')
        }
    }
    //* проверка на существования пользователя по id
    static testForUser(id) {
        try {
            const sv = require(`../../${TI.saveDB}/${id}.json`)
            if (sv.meta.version != TI.ver) {
                return false
            }
            return true
        } catch {
            return false
        }
    }
    //* проверка файлов сохранения на версии и вывод в консоль
    static testAllSaves() {
        const saves = fs.readdirSync(`${TI.saveDB}`)
        let svs = {
            "outd": []
        }
        saves.forEach(SF => {
            try {
                const US = require(`../../${TI.saveDB}/${SF}.json`)
                if (svs[US.meta.version] == undefined) {
                    svs[US.meta.version] = []
                    svs[US.meta.version].push(SF)
                } else {
                    svs[US.meta.version].push(SF)
                }
            } catch {
                svs.outd.push(SF)
            }
        })
        let txt = ""
        txt += `Проверено сохранений пользователей: ${saves.length}`
        for (let key in svs) {
            if (key == 'outd') {
                txt += `\nУстаревшие сохранения(0.2.2 и старше): ${svs[key].length}`
            } else {
                txt += `\n${key}: ${svs[key].length}`
            }
        }
        cLog(txt, 'i')
    }
    //* проверка юзера на актуальность сейва, его автоматическая миграция или создание
    static testFixUpdateCreate(id) {
        if (!this.testForUser(id)) {
            try {
                this.migrateSave(id)
            } catch {
                this.createSave(id)
            }
        }
    }
    //*миграция сейвов до самой последней версии
    static migrateSave(id) {
        let save;
        try {
            save = this.getSave(id)
        } catch {
            save = require('./version_modules/0.2.3.js').update_SF(id)
        }
    }
};
module.exports = saveInteraction;