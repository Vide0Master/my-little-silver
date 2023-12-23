
//* console logger от VideoMaster

//* добавляем библиотеку логгера в файл
const flog=require("./fileLogger.js")

module.exports = function (line, type) {
    //* формируем строку даты
    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    let NDT=datetime
    datetime = `\x1b[46m${datetime}\x1b[0m `

    let text = ""
    switch (type) {
        default: {
            //* просто вывод в консоль с таймстэмпом
            text =`${datetime}\x1b[0m${line}\x1b[0m`
        }; break;
        case "e": {
            //* вывод ошибки
            text =`${datetime}\x1b[41m\x1b[37mERR\x1b[0m ${line}`
        }; break;
        case "s": {
            //* успех
            text =`${datetime}\x1b[42m\x1b[37mSUCC\x1b[0m ${line}`
        }; break;
        case "w": {
            //* предупреждение
            text =`${datetime}\x1b[43m\x1b[37mWARN\x1b[0m ${line}`
        }; break;
        case "i": {
            //* информация
            text =`${datetime}\x1b[44m\x1b[37mINFO\x1b[0m ${line}`
        }; break;
        case "uwu": {
            //? UWU
            text =`${datetime}\x1b[45m\x1b[37mUwU\x1b[0m ${line}`
        }; break;
        case "owo": {
            //? OWO
            text =`${datetime}\x1b[45m\x1b[37mOWO\x1b[0m ${line}`
        }; break;
    }
    console.log(text);
    flog.writeFile(`[${NDT}] [${type}] [${line}]`)
};