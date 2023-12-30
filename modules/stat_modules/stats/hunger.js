
//* Health stat module by VideoMaster

const sets={
    stat_name:"hunger",
    base_dec:0.1,
}

module.exports = class {
    static values=sets
    static timeCacl(save){
        let stat=save[sets.stat_name]
        const mod=this.depCalc(save)
        stat-=sets.base_dec*mod
        return stat
    }
    static addCacl(save,inc){
        let stat = save[sets.stat_name]+inc
        return stat
    }
    static depCalc(save){
        let dep_mod=1
        if(save.mood<=70){
            dep_mod+=Math.mod((save.mood/70)-1)*1.3
        }
        return dep_mod
    }
}