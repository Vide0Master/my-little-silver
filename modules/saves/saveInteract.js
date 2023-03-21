
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
            const user=this.save_template.user
            fs.writeFileSync(`${db}/${id}/user.json`,JSON.stringify(user))
            const telemetry=this.save_template.telemetry
            fs.writeFileSync(`${db}/${id}/telemetry.json`,JSON.stringify(telemetry))
            const save=this.save_template.save
            fs.writeFileSync(`${db}/${id}/save.json`,JSON.stringify(save))
            cLog(`Зарегестрирован новый пользователь, id:${id}`,'i')
        }
    }
    static testForUser(id){
        try{
            require(`../../${db}/${id}/user.json`)
            return true
        }catch(err){
            return false
        }
    }
};
module.exports = saveInteraction;