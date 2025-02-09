
//* Line interaction от Anirunahs & VideoMaster

const fs = require('fs')
const cLog = require('../consoleLogger')
class LineInteract {
    static getRandomLine(lines_path,lang) {
        const lineFile = require(`./language/${lang}.json`)
        const line_array = eval(`lineFile.${lines_path}`)
        return line_array[Math.floor(Math.random() * line_array.length)]
    }
    static getLine(line_path,lang) {
        const lineFile = require(`./language/${lang}.json`)
        return eval(`lineFile.${line_path}`)
    }
    static testAllLanguages(){
        let l_lang={l:[],e:[]}
        fs.readdirSync('modules/lines/language').forEach(file=>{
            try{
                require('./language/'+file)
                l_lang.l.push(file.slice(0, -5))
            }catch{
                l_lang.e.push(file.slice(0, -5))
            }
        })
        l_lang.l.length != 0 ? cLog(`Загруженные языки: ${l_lang.l}`, 'i') : cLog(`НЕ ОДНОГО ЯЗЫКА НЕ БЫЛО ЗАГРУЖЕНО!`, 'e')
        l_lang.e.length != 0 ? cLog(`Не загружены языки: ${l_lang.e}`, 'w') : {}
    }
    static getLangs(){
        let l_lang={l:[],e:[]}
        fs.readdirSync('modules/lines/language').forEach(file=>{
            try{
                require('./language/'+file)
                l_lang.l.push(file.slice(0, -5))
            }catch{
                l_lang.e.push(file.slice(0, -5))
            }
        })
        return l_lang
    }
};
module.exports = LineInteract;