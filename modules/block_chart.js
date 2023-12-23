
//* Block chart от VideoMaster

const color_squares=['🟥','🟧','🟨','🟩']
module.exports = function(val,max_val,q){
    const mod = val/max_val
    let gn=""
    for(let i=0;i<q*mod;i++){
        gn+=color_squares[Math.floor((i/q)*4)]
    }
    return gn
};
//* просто выводит квадратики в зависимости от заданного требуемого максимума, по факту, в диапазоне значения