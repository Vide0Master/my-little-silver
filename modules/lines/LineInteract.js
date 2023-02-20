class LineInteract{
    static returnRandomLineFrom(lineList) {
        return lineList[Math.floor(Math.random()*lineList.length)]
    }
    static getLine(num){
        return lineList[num]
    }
};
module.exports = LineInteract;