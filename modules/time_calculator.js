
//* Time calculator от VideoMaster

//* получение библиотек и задача простых функций
const SI = require('./saves/saveInteract')
const decrements = require('../config/Silver_values.json').decrements
const clamp = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

function decreaseStat(stat, inc) {
    return clamp(stat - inc, 0, 100)
}

module.exports = function (interaction) {
    //* получение сохранения и формирование таймстэмпа в минутах
    let sav = SI.getSave(interaction.user.id,).save
    const tm = Math.floor(((Date.now()-sav.Silver.LIT)/1000/60))
    //* обработка характеристик на основе разницы времени между последним и текущим взаимодействием
    if (tm>5 && sav.Silver.LIT!=0) {
        for (let val in sav.Silver.base_stats) {
            for (let i = 0; i < tm; i++) {
                switch (val) {
                    case "health": {
                        sav.Silver.base_stats.health = decreaseStat(sav.Silver.base_stats.health, decrements.health).toFixed(3)
                    }; break;
                    case "hunger": {
                        sav.Silver.base_stats.hunger = decreaseStat(sav.Silver.base_stats.hunger, decrements.hunger).toFixed(3)
                    }; break;
                    case "dirt": {
                        sav.Silver.base_stats.dirt = decreaseStat(sav.Silver.base_stats.dirt, decrements.dirt).toFixed(3)
                    }; break;
                    case "mood": {
                        sav.Silver.base_stats.mood = decreaseStat(sav.Silver.base_stats.mood, decrements.mood).toFixed(3)
                    }; break;
                }
            }
        }
        sav.Silver.LIT = Date.now()
        //* сохранение данных
        SI.setSave(interaction.user.id, "save", sav)
    }
    //* добавление таймстэмпа взаимодействия если он отстутвует
    if(sav.Silver.LIT==""){
        sav.Silver.LIT = Date.now()
        SI.setSave(interaction.user.id, "save", sav)
    }
};