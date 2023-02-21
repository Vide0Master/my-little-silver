
//* console logger от VideoMaster


module.exports = function (line, type) {
    switch (type) {
        default: {
            console.log(`\x1b[0m${line}\x1b[0m`)
        }; break;
        case "e": {
            console.log(`\x1b[41m\x1b[37m ERR\x1b[0m ${line}`)
        }; break;
        case "g": {
            console.log(`\x1b[42m\x1b[37mGOOD\x1b[0m ${line}`)
        }; break;
        case "w": {
            console.log(`\x1b[43m\x1b[37mWARN\x1b[0m ${line}`)
        }; break;
        case "i": {
            console.log(`\x1b[45m\x1b[37mINFO\x1b[0m ${line}`)
        }; break;
        case "uwu":{
            console.log(`\x1b[45m\x1b[37m UwU\x1b[0m ${line}`)
        }; break;
        case "owo":{
            console.log(`\x1b[45m\x1b[37m OWO\x1b[0m ${line}`)
        }; break;
    }
};