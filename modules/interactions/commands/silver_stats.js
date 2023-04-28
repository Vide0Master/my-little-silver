
//* testCommand от VideoMaster

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const LI = require('../../lines/lineInteract')
const SI = require('../../saves/saveInteract')
const BC = require('../../block_chart.js')

module.exports = {
    settings: { active: true, public: false },
    command: new SlashCommandBuilder()
        .setName('silver_stats')
        .setDescription('Get our Silver stats.'),
    async execute(interaction) {
        let save = SI.getSave(interaction.user.id, "save")
        const lpack = LI.getLine("system.interactions.silver_stats", SI.getSave(interaction.user.id, "user").settings.lang)
        
        let glos=""
        for(let stat in save.Silver.base_stats) {
            glos+=`${lpack.base_stats[stat]}\n${BC(save.Silver.base_stats[stat], 100, 12)}\n\n`
        }

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(lpack.s_stats)
                .setDescription(glos)
            ]
        });
    }
};