
//* Save Interaction от Anirunahs & VideoMaster

//*подключение библиотек и функций
const fs = require('fs');
const cLog = require('../consoleLogger')
const db = require('../../config/techInfo.json').saveDB


class saveInteraction {
    //* получение темплейта сохранения
    static save_template = require('./save_template.json')
    //* получение файла сохранения по id пользователя и типу файла сохранения
    static getSave(id, type) {
        return JSON.parse(fs.readFileSync(`${db}/${id}/${type}.json`))
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
            require(`../../${db}/${id}/user.json`)
            return true
        } catch (err) {
            return false
        }
    }
    //* проверка всех файлов сохранений и их исправление для новых версий файла сохранения
    static testAllSaves() {
        const saves = fs.readdirSync(`${db}`)
        saves.forEach(sfolder => {
            let user = this.getSave(sfolder, 'user')
            this.fixObject(user, this.save_template.user)
            this.setSave(sfolder, 'user', user)

            let telemetry = this.getSave(sfolder, 'telemetry')
            this.fixObject(telemetry, this.save_template.telemetry)
            this.setSave(sfolder, 'telemetry', telemetry)

            let save = this.getSave(sfolder, 'save')
            this.fixObject(save, this.save_template.save)
            this.setSave(sfolder, 'save', save)
        })
        cLog(`Проверено сохранений пользователей: ${saves.length}`, 'g')
    }
    //* алгоритм исправления файла сохранения
    static fixObject(obj1, obj2) {
        function updateNestedObjects(obj1, obj2) {
            for (let key in obj2) {
                if (typeof obj2[key] === 'object') {
                    if (typeof obj1[key] === 'undefined') {
                        obj1[key] = obj2[key];
                    }
                    if (Object.values(Object.values(obj2)[0]).length > 0) {
                        updateNestedObjects(obj1[key], obj2[key]);
                    }
                } else {
                    if (typeof obj1[key] === 'undefined') {
                        obj1[key] = obj2[key];
                    }
                }
            }
        }
        function deleteNestedObjects(obj1, obj2) {
            for (let key in obj1) {
                if (typeof obj1[key] === 'object') {
                    if (typeof obj2[key] === 'undefined') {
                        delete obj1[key];
                    }
                    else if (Object.values(Object.values(obj2)[0]).length > 0) {
                        deleteNestedObjects(obj1[key], obj2[key]);
                    }
                } else {
                    if (typeof obj2[key] === 'undefined') {
                        delete obj1[key];
                    }
                }
            }
        }
        deleteNestedObjects(obj1, obj2);
        updateNestedObjects(obj1, obj2);
    }
};
module.exports = saveInteraction;