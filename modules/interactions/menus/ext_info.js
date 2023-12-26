
//* version menu от VideoMaster

const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const SI = require('../../saves/saveInteract')
const LI = require('../../lines/lineInteract')

module.exports = {
    async execute(interaction) {
        let save = SI.getSave(interaction.user.id)
        if (interaction.values[0] != "ext_info") {
            save.user.settings.extended_info = interaction.values[0]
            SI.setSave(interaction.user.id, save)
        }
        const lpack = LI.getLine("system.interactions.extended_info", save.user.settings.lang)
        let types = [];
        lpack.types.forEach((line, i) => {
            types.push({
                label: line,
                value: i.toString()
            })
        })

        interaction.update({
            embeds:
                [new EmbedBuilder()
                    .setTitle(`${lpack.cur_disp} ${lpack.types[save.user.settings.extended_info]}.`)
                ],
            components:
                [new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('ext_info')
                            .setPlaceholder(lpack.PH_menu)
                            .addOptions(types)
                    )
                ]
        })
    }
}