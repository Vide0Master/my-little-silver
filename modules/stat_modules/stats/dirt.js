
//* Health stat module by VideoMaster

const sets={
    stat_name:"dirt",
    base_dec:0.01,
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
        return dep_mod
    }
}