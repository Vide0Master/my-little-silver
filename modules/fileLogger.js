
//* File Logger от VideoMaster

const fs = require('fs');
let file = ""
let strgs=["Ну и что мы сломали на этот раз?", "Что-то ищешь?", "Ха, так и думал что что-то сломалось)", "Аутизм крепчал!", "Алкоголизм - не помеха", "Только бог поможет понять что здесь написано..."]

class fileLogger {
    static createFile() {
        if (!fs.existsSync("./logs")) {
            fs.mkdirSync("./logs");
        }
        let currentdate = new Date();
        let datetime = currentdate.getDate() + "."
            + (currentdate.getMonth() + 1) + "."
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + "."
            + currentdate.getMinutes() + "."
            + currentdate.getSeconds();
        file=`log-[${datetime}]`
        fs.appendFileSync(`./logs/${file}.txt`,`Лог консоли за [${datetime}]\n\n"${strgs[Math.round(Math.random()*strgs.length)]}"\n\n`)
    }
    static writeFile(data) {
        fs.appendFileSync(`./logs/${file}.txt`,`${data}\n`)
    }
};
module.exports = fileLogger;