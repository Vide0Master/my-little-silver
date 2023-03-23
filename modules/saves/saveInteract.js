
//* Save Interaction от VideoMaster

const fs = require('fs');
const cLog = require('../consoleLogger')
const db = require('../../config/techInfo.json').saveDB


class saveInteraction {
    static save_template = require('./save_template.json')

    static getSave(id, type) {
        return JSON.parse(fs.readFileSync(`${db}/${id}/${type}.json`))
    }
    static setSave(id, type, data) {
        fs.writeFileSync(`${db}/${id}/${type}.json`, JSON.stringify(data))
    }
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
    static testForUser(id) {
        try {
            require(`../../${db}/${id}/user.json`)
            return true
        } catch (err) {
            return false
        }
    }
    static testAllSaves() {
        const saves = fs.readdirSync(`${db}`)
        saves.forEach(sfolder => {
            let user = saveInteraction.getSave(sfolder, 'user')
            saveInteraction.updateObject(user, saveInteraction.save_template.user)
            saveInteraction.setSave(sfolder, 'user', user)
            let save = saveInteraction.getSave(sfolder, 'save')
            saveInteraction.updateObject(save, saveInteraction.save_template.save)
            saveInteraction.setSave(sfolder, 'save', save)
        })
        cLog(`Проверено ${saves.length} пользователей.`, 'g')
    }
    static updateObject(obj1, obj2) {
        function updateNestedObjects(obj1, obj2) {
            for (let key in obj2) {
                if (typeof obj2[key] === 'object') {
                    if (typeof obj1[key] === 'undefined') {
                        obj1[key] = {};
                    }
                    updateNestedObjects(obj1[key], obj2[key]);
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
                    else {
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