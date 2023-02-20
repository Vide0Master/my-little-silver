
//* console logger от VideoMaster


module.exports = function (line, type) {
    switch (type) {
        default: {
            console.log(`\n\x1b[0m${line}\x1b[0m`)
        }; break;
        case "e": {
            console.log(`\n\x1b[31m${line}\x1b[0m`)
        }; break;
        case "g": {
            console.log(`\n\x1b[32m${line}\x1b[0m`)
        }; break;
        case "w": {
            console.log(`\n\x1b[33m${line}\x1b[0m`)
        }; break;
        case "i": {
            console.log(`\n\x1b[35m${line}\x1b[0m`)
        }; break;
    }
};