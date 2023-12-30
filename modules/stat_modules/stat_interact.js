
//* Time calculator от VideoMaster

//* получение библиотек и задача простых функций
const fs = require(`fs`)
const SI = require('../saves/saveInteract')
const clamp = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
const cLog=require('../consoleLogger.js')

let stats = {}

module.exports = class {
    static sts=stats
    static timeCacl(interaction) {
        //* получение сохранения и формирование таймстэмпа в минутах
        let sav = SI.getSave(interaction.user.id,)
        const tm = Math.floor(((Date.now() - sav.Silver.LIT) / 1000 / 60))
        //* обработка характеристик на основе разницы времени между последним и текущим взаимодействием
        if (tm > 5 && sav.Silver.LIT != 0) {
            for (let i = 0; i < tm; i++) {

            }

            sav.Silver.LIT = Date.now()
            //* сохранение данных
            SI.setSave(interaction.user.id, "save", sav)
        }
        //* добавление таймстэмпа взаимодействия если он отстутвует
        if (sav.Silver.LIT == "") {
            sav.Silver.LIT = Date.now()
            SI.setSave(interaction.user.id, "save", sav)
        }
    }
    static aquireAllStats(){
        let stts={l:[],e:[]}
        fs.readdirSync('./modules/stat_modules/stats').forEach(stat => {
            try{
                stats[stat] = require(`./stats/${stat}`)
                stts.l.push(stat)
            }catch{
                stts.e.push(stat)
            }
        })
        stts.l.length != 0 ? cLog(`Загруженные характеристики: ${stts.l}`, 'i') : cLog(`НИ ОДНОЙ ХАРАКТЕРИСТИКИ НЕ БЫЛО ЗАГРУЖЕНО!`, 'e')
        stts.e.length != 0 ? cLog(`Не загружены характеристики: ${stts.e}`, 'w') : {}
    }
}