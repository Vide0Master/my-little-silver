
//* version menu от VideoMaster

const { EmbedBuilder } = require('discord.js');
const SI = require('../../saves/saveInteract')
const LI = require('../../lines/lineInteract')

module.exports = {
    async execute(interaction) {
        let save = SI.getSave(interaction.user.id, "user")
        save.settings.extended_info = interaction.values[0]
        SI.setSave(interaction.user.id, "user", save)

        const lpack = LI.getLine("system.interactions.extended_info", save.settings.lang)

        interaction.update({
            embeds:
                [new EmbedBuilder()
                    .setTitle(`${lpack.cur_disp} ${lpack.types[save.settings.extended_info]}.`)
                ]
        })
    }
}