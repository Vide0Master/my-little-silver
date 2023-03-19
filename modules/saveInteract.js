
//* Save Interaction от VideoMaster

const fs = require('node:fs');
const cLog = require('./consoleLogger')
const db='users_test'

class saveInteraction {
    static getSave(id) {
        
    }
    static setSave(id){

    }
    static createSave(id){
        const user={}
        fs.writeFileSync(`../${db}/${id}/user.json`,user)
        const telemetry={}
        fs.writeFileSync(`../${db}/${id}/telemetry.json`,telemetry)
        const save={}
        fs.writeFileSync(`../${db}/${id}/save.json`,save)
    }
    static testForUser(id){
        try{
            const sav = require(`.../users_test/${id}/user.json`)
        }catch(err){
            cLog(`При поиске пользователя id:${id}, файл user.json не был найден.`,'w')
        }

    }
};
module.exports = saveInteraction;