
//* language от VideoMaster

const fs = require('node:fs');
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const SI = require('../../saves/saveInteract.js')
const LI = require('../../lines/LineInteract.js')

module.exports = {
    async execute(interaction) {
        const sav = SI.getSave(interaction.user.id, "user")
        sav.settings.lang = interaction.values[0]
        SI.setSave(interaction.user.id, "user", sav)

        const user_lang = SI.getSave(interaction.user.id, "user").settings.lang

        const lng_lines = LI.getLine('system.interactions.language', user_lang)

        let languages = []
        const lngs = LI.getLangs().l
        lngs.forEach((line) => {
            const lng = LI.getLine('system.interactions.language.NM', line)
            languages.push({
                label: lng,
                value: line
            })
        })

        interaction.update({
            embeds:
                [new EmbedBuilder()
                    .setColor(0x0096c8)
                    .setTitle(`${lng_lines.CRL}: ${lng_lines.NM}`)
                ],
            components:
                [new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('language')
                            .setPlaceholder(LI.getLine('system.interactions.language.CL', user_lang))
                            .addOptions(languages)
                    )
                ]
        })
    }
}