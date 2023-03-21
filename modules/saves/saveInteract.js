
//* Save Interaction от VideoMaster

const fs = require('fs');
const cLog = require('../consoleLogger')
const db=require('../../config/techInfo.json').saveDB


class saveInteraction {
    static save_template=require('./save_template.json')

    static getSave(id,type) {
        return JSON.parse(fs.readFileSync(`${db}/${id}/${type}.json`))
    }
    static setSave(id,type,data){
        fs.writeFileSync(`${db}/${id}/${type}.json`,JSON.stringify(data))
    }
    static createSave(id){
        if(!saveInteraction.testForUser(id)){
            fs.mkdirSync(`${db}/${id}`)
            const user={}
            fs.writeFileSync(`${db}/${id}/user.json`,JSON.stringify(user))
            const telemetry={}
            fs.writeFileSync(`${db}/${id}/telemetry.json`,JSON.stringify(telemetry))
            const save={}
            fs.writeFileSync(`${db}/${id}/save.json`,JSON.stringify(save))
        }else{
            cLog(`При попытке регистрации пользователя id:${id}, была обнаружена существующая папка с пользователем`,'w')
        }
    }
    static testForUser(id){
        try{
            require(`../../${db}/${id}/user.json`)
            return true
        }catch(err){
            cLog(`При поиске пользователя id:${id}, файл user.json не был найден.`,'w')
            return false
        }
    }
};
module.exports = saveInteraction;