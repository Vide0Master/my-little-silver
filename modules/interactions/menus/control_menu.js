
//* control menu от VideoMaster

const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const SI = require('../../saves/saveInteract')
const LI = require('../../lines/lineInteract')
module.exports = {
    async execute(interaction) {
        let save = SI.getSave(interaction.user.id)
        const lpack = LI.getLine('system.interaction.control_menu', save.user.settings.lang)
        let embed = "def_state"
        if (interaction.values[0] != "control_menu") {
            switch (interaction.values[0]) {
                case "freeze": {
                    save.meta.state = "frozen"
                    embed ="freeze"
                }; break;
                case "unfreeze": {
                    save.meta.state = "active"
                    save.save.Silver.LIT=Math.floor(((Date.now()-sav.Silver.LIT)/1000/60))
                    embed ="unfreeze"
                }; break;
            }
            SI.setSave(interaction.user.id, save)
        }

        interaction.update({
            embeds:
                [new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(lpack[embed].title)
                    .setDescription(lpack[embed].desc)
                ],
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('control_menu')
                        .setPlaceholder(lpack.placeholder)
                        .addOptions([
                            { label: lpack.options.freeze, value: "freeze" },
                            { label: lpack.options.unfreeze, value: "unfreeze" }
                        ])
                )
            ]
        })
    }
}