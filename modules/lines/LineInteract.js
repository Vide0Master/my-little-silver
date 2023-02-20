class LineInteract{
    static returnRandomLineFrom(lineList) {
        return lineList[Math.floor(Math.random()*lineList.length)]
    }
};
module.exports = LineInteract;