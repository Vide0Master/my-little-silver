
//* testCommand от VideoMaster

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const LI = require('../../lines/lineInteract')
const SI = require('../../saves/saveInteract')

module.exports = {
    settings: { active: true, public: false },
    command: new SlashCommandBuilder()
        .setName('interact')
        .setDescription('Interact with Silver'),
    async execute(interaction) {
        const lpack = LI.getLine("system.interactions.silver_interact", SI.getSave(interaction.user.id).user.settings.lang)

        const interactions=[]
        for(let stat in lpack.stat_interactions){
            interactions.push({
                label: lpack.stat_interactions[stat],
                value: stat
            })
        }

        await interaction.reply({
            components:
                [new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('interact')
                            .setPlaceholder(lpack.PH_menu)
                            .addOptions(interactions)
                    )
                ]
        });
    }
};