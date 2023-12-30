
//* Health stat module by VideoMaster

const sets={
    stat_name:"health",
    base_dec:0.005,
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
        if(save.hunger<=40){
            dep_mod+=Math.mod((save.hunger/40)-1)*0.4
        }
        if(save.dirt<=40){
            dep_mod+=Math.mod((save.dirt/20)-1)*0.2
        }
        if(save.mood<=40){
            dep_mod+=Math.mod((save.mood/40)-1)*0.3
        }
        return dep_mod
    }
}