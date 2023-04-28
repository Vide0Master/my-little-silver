
//*  interaction от VideoMaster

const { EmbedBuilder } = require('discord.js');
const SI = require('../../saves/saveInteract')
const LI = require('../../lines/lineInteract')
const clamp = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
const BC = require('../../block_chart.js')
const increments = require('../../../config/Silver_values.json').increments

function increaseStat(stt, inc) {
    return clamp(stt - 0 + inc, 0, 100)
}

module.exports = {
    async execute(interaction) {
        let save = SI.getSave(interaction.user.id, "save")
        const stat = interaction.values[0]
        switch (stat) {
            case "health": {
                save.Silver.base_stats.health = increaseStat(save.Silver.base_stats.health, increments.health).toFixed(3)
                save.Silver.base_stats.mood = increaseStat(save.Silver.base_stats.mood, 30).toFixed(3)
            }; break;
            case "hunger": {
                save.Silver.base_stats.hunger = increaseStat(save.Silver.base_stats.hunger, increments.hunger).toFixed(3)
                save.Silver.base_stats.mood = increaseStat(save.Silver.base_stats.mood, 10).toFixed(3)
                save.Silver.base_stats.dirt = increaseStat(save.Silver.base_stats.dirt, 5).toFixed(3)
            }; break;
            case "dirt": {
                save.Silver.base_stats.dirt = increaseStat(save.Silver.base_stats.dirt, increments.dirt).toFixed(3)
                save.Silver.base_stats.mood = increaseStat(save.Silver.base_stats.mood, 5).toFixed(3)
            }; break;
            case "mood": {
                save.Silver.base_stats.mood = increaseStat(save.Silver.base_stats.mood, increments.mood).toFixed(3)
            }; break;
        }
        console.log(increaseStat(save.Silver.base_stats.health, increments.health).toFixed(3))
        SI.setSave(interaction.user.id, "save", save)

        const lpack = LI.getLine("system.interactions.silver_interact", SI.getSave(interaction.user.id, "user").settings.lang)
        const slpack = LI.getLine("system.interactions.silver_stats", SI.getSave(interaction.user.id, "user").settings.lang)

        let info;
        if (SI.getSave(interaction.user.id, "user").settings.extended_info >= 1) {
            info = `${slpack.base_stats[stat]} | (${save.Silver.base_stats[stat]}/100)\n${BC(save.Silver.base_stats[stat], 100, 12)}`
        } else {
            info = `${slpack.base_stats[stat]}\n${BC(save.Silver.base_stats[stat], 100, 12)}`
        }

        interaction.update({
            embeds:
                [new EmbedBuilder()
                    .setTitle(`${lpack.interacted[stat]}`)
                    .setDescription(info)
                ]
        })
    }
}