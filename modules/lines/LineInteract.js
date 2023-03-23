
//* Line interaction от VideoMaster

class LineInteract {
    static returnRandomLineFrom(lines_path,lang) {
        const lineList = require(`./language/${lang}.json`)
        const line_array = eval(`lineList.${lines_path}`)
        return line_array[Math.floor(Math.random() * line_array.length)]
    }
    static getLine(num) {
        return lineList[num]
    }
};
module.exports = LineInteract;