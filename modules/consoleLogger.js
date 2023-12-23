
//* console logger от VideoMaster


module.exports = function (line, type) {
    //* формируем строку даты
    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    datetime = `\x1b[46m${datetime}\x1b[0m `

    switch (type) {
        default: {
            //* просто вывод в консоль с таймстэмпом
            console.log(`${datetime}\x1b[0m${line}\x1b[0m`)
        }; break;
        case "e": {
            //* вывод ошибки
            console.log(`${datetime}\x1b[41m\x1b[37mERR\x1b[0m ${line}`)
        }; break;
        case "g": {
            //* вывод хорошего состояни
            console.log(`${datetime}\x1b[42m\x1b[37mGOOD\x1b[0m ${line}`)
        }; break;
        case "w": {
            //* предупреждение
            console.log(`${datetime}\x1b[43m\x1b[37mWARN\x1b[0m ${line}`)
        }; break;
        case "i": {
            //* информация
            console.log(`${datetime}\x1b[44m\x1b[37mINFO\x1b[0m ${line}`)
        }; break;
        case "uwu": {
            //? UWU
            console.log(`${datetime}\x1b[45m\x1b[37mUwU\x1b[0m ${line}`)
        }; break;
        case "owo": {
            //? OWO
            console.log(`${datetime}\x1b[45m\x1b[37mOWO\x1b[0m ${line}`)
        }; break;
    }
};