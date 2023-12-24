
//* Save Interaction от Anirunahs & VideoMaster

//*подключение библиотек и функций
const fs = require('fs');
const cLog = require('../consoleLogger')
const db = require('../../config/techInfo.json').saveDB


class saveInteraction {
    //* получение файла сохранения по id пользователя и типу файла сохранения
    static getSave(id, type) {
        return JSON.parse(fs.readFileSync(`${db}/${id}.json`)[type])
    }
    //* обновление файла сохранения новыми данными
    static setSave(id, type, data) {
        fs.writeFileSync(`${db}/${id}/${type}.json`, JSON.stringify(data))
    }
    //* создание сохранения пользователя
    static createSave(id) {
        if (!saveInteraction.testForUser(id)) {
            fs.mkdirSync(`${db}/${id}`)
            const user = this.save_template.user
            fs.writeFileSync(`${db}/${id}/user.json`, JSON.stringify(user))
            const telemetry = this.save_template.telemetry
            fs.writeFileSync(`${db}/${id}/telemetry.json`, JSON.stringify(telemetry))
            const save = this.save_template.save
            fs.writeFileSync(`${db}/${id}/save.json`, JSON.stringify(save))
            cLog(`Зарегестрирован новый пользователь, id:${id}`, 'i')
        }
    }
    //* проверка на существования пользователя по id
    static testForUser(id) {
        try {
            require(`../../${db}/${id}.json`)
            return true
        } catch (err) {
            return false
        }
    }
    //* проверка файлов сохранения на версии
    static testAllSaves() {
        const saves = fs.readdirSync(`${db}`)
        let svs = {
            "outd": []
        }
        saves.forEach(SF => {
            try {
                const US = require(`../../${db}/${SF}.json`)
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
};
module.exports = saveInteraction;