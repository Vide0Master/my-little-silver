
//* 0.2.2 -> 0.2.3

const fs = require('fs');
const DB = require('../../../config/techInfo.json').saveDB

const save_template = {
    "user": {
        "settings": {
            "extended_info": 0,
            "lang": "en"
        }
    },
    "save": {
        "Silver": {
            "LIT": "",
            "base_stats": {
                "health": 100,
                "hunger": 100,
                "dirt": 100,
                "mood": 50
            }
        }
    },
    "telemetry": {
        "commandsExecuted": {},
        "menusExecuted":{}
    },
    "meta": {
        "state": "unactive",
        "version": "0.2.3"
    }
}

module.exports = class {
    static MI = { "BV": "0.2.2", "MV": "0.2.3" }
    static ST = save_template
    static update_SF(id) {
        const save = {
            "user": JSON.parse(fs.readFileSync(`./${DB}/${id}/user.json`)),
            "save": JSON.parse(fs.readFileSync(`./${DB}/${id}/save.json`)),
            "telemetry": JSON.parse(fs.readFileSync(`./${DB}/${id}/telemetry.json`))
        }
        fs.rmSync(`./${DB}/${id}`, { recursive: true, force: true })
        let new_save = save_template
        new_save = mergeObjects(save, new_save)
        fs.writeFileSync(`./${DB}/${id}.json`, JSON.stringify(new_save))
        
    }
}

function mergeObjects(obj1, obj2) {
    for (let key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (typeof obj2[key] === 'object' && obj2[key] !== null && !Array.isArray(obj2[key])) {
                // Рекурсивный вызов для объектов
                obj2[key] = mergeObjects(obj1[key] || {}, obj2[key]);
            } else if (obj1.hasOwnProperty(key)) {
                // Замена значения из первого объекта, если ключ существует в обоих объектах
                obj2[key] = obj1[key];
            }
            // Игнорирование отсутствующих ключей в первом объекте
        }
    }
    return obj2;
}