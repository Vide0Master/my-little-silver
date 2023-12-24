
//* 0.2.2 -> 0.2.3

const fs = require('fs');
const DB=require('../../../config/techInfo.json').saveDB

const save_template = {
    "user": {
        "settings": {
            "extended_info": 0,
            "lang": "en"
        }
    },
    "save": {
        "Silver": {
            "state": "unactive",
            "LIT": "",
            "base_stats": {
                "health": 100,
                "hunger": 100,
                "dirt": 100,
                "mood": 50
            }
        },
    },
    "telemetry": {
        "commandsExecuted": {}
    }
}

module.exports = function (id) {
    const save=readFolder(id)
    fs.rm(`./${DB}/${id}`,{ recursive: true, force: true })
    let new_save = save_template
    new_save = copyProperties(save, new_save)
    fs.writeFileSync(`./${DB}/${id}.json`,JSON.stringify(new_save))
    return 0
}

function copyProperties(source, destination) {
    for (const key in destination) {
        if (destination.hasOwnProperty(key)) {
            if (source.hasOwnProperty(key)) {
                if (typeof destination[key] === 'object' && destination[key] !== null) {
                    // Рекурсивное копирование для объектов и массивов
                    source[key] = copyProperties(source[key] || (Array.isArray(destination[key]) ? [] : {}), destination[key]);
                } else {
                    // Копирование примитивных типов
                    source[key] = destination[key];
                }
            }
        }
    }
    return source;
}

function readFolder(id) {
    let result={
        "user": JSON.parse(fs.readFileSync(`./${DB}/${id}/user.json`)),
        "save": JSON.parse(fs.readFileSync(`./${DB}/${id}/save.json`)),
        "telemetry": JSON.parse(fs.readFileSync(`./${DB}/${id}/telemetry.json`))
    }
    return result;
}