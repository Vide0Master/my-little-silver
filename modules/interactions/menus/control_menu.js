
//* control menu от VideoMaster

const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const SI = require('../../saves/saveInteract')
const LI = require('../../lines/lineInteract')
module.exports = {
    async execute(interaction) {
        try {
            // console.log(interaction)
            let save = SI.getSave(interaction.user.id)
            const lpack = LI.getLine('system.interactions.control_menu', save.user.settings.lang)
            let embed = lpack["def_state"]

            if (interaction.values[0] != "control_menu") {
                save.meta.state=interaction.values[0]
                embed=lpack[interaction.values[0]]
                if(interaction.values[0]=="active") save.save.Silver.LIT=Date.now()
            }

            SI.setSave(interaction.user.id, save)

            await interaction.update({
                embeds:
                    [new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle(embed.title)
                        .setDescription(embed.desc)
                    ],
                components: [
                    new ActionRowBuilder().addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('control_menu')
                            .setPlaceholder(lpack.placeholder)
                            .addOptions([
                                { label: lpack.options.freeze, value: "freezed" },
                                { label: lpack.options.unfreeze, value: "active" }
                            ])
                    )
                ]
            })
        } catch (err) {
            console.log(err)
        }

    }
}