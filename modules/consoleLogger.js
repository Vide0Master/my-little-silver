
//* console logger от VideoMaster


module.exports = function (line, type) {
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
            console.log(`${datetime}\x1b[0m${line}\x1b[0m`)
        }; break;
        case "e": {
            console.log(`${datetime}\x1b[41m\x1b[37m ERR\x1b[0m ${line}`)
        }; break;
        case "g": {
            console.log(`${datetime}\x1b[42m\x1b[37mGOOD\x1b[0m ${line}`)
        }; break;
        case "w": {
            console.log(`${datetime}\x1b[43m\x1b[37mWARN\x1b[0m ${line}`)
        }; break;
        case "i": {
            console.log(`${datetime}\x1b[44m\x1b[37mINFO\x1b[0m ${line}`)
        }; break;
        case "uwu": {
            console.log(`${datetime}\x1b[45m\x1b[37m UwU\x1b[0m ${line}`)
        }; break;
        case "owo": {
            console.log(`${datetime}\x1b[45m\x1b[37m OWO\x1b[0m ${line}`)
        }; break;
    }
};