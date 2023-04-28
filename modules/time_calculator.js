
//* Time calculator от VideoMaster

const SI = require('./saves/saveInteract')
const decrements = require('../config/Silver_values.json').decrements
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

function decreaseStat(stat, inc) {
    return clamp(stat - inc, 0, 100)
}

module.exports = function (interaction) {
    let sav = SI.getSave(interaction.user.id, "save")
    const tm = Math.floor(((Date.now()-sav.Silver.LIT)/1000/60))
    if (tm>5) {
        for (let val in sav.Silver.base_stats) {
            for (let i = 0; i < tm; i++) {
                switch (val) {
                    case "health": {
                        sav.Silver.base_stats.health = decreaseStat(sav.Silver.base_stats.health, decrements.health).toFixed(3)
                    }; break;
                    case "hunger": {
                        sav.Silver.base_stats.hunger = decreaseStat(sav.Silver.base_stats.hunger, decrements.hunger).toFixed(3)
                    }; break;
                    case "dirt": {
                        sav.Silver.base_stats.dirt = decreaseStat(sav.Silver.base_stats.dirt, decrements.dirt).toFixed(3)
                    }; break;
                    case "mood": {
                        sav.Silver.base_stats.mood = decreaseStat(sav.Silver.base_stats.mood, decrements.mood).toFixed(3)
                    }; break;
                }
            }
        }
        sav.Silver.LIT = Date.now()
        SI.setSave(interaction.user.id, "save", sav)
    } else {
        sav.Silver.LIT = Date.now()
        SI.setSave(interaction.user.id, "save", sav)
    }
};