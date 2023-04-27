
//* extended_info от VideoMaster

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const SI = require('../../saves/saveInteract')
const LI = require('../../lines/lineInteract')

module.exports = {
    settings: { active: true, public: false },
    command: new SlashCommandBuilder()
        .setName('extended_info')
        .setDescription('Extended info setting.'),
    async execute(interaction) {
        const save = SI.getSave(interaction.user.id, "user")
        const lpack = LI.getLine("system.interactions.extended_info", save.settings.lang)

        let types = [];
        lpack.types.forEach((line, i) => {
            types.push({
                label: line,
                value: i.toString()
            })
        })

        await interaction.reply({
            embeds:
                [new EmbedBuilder()
                    .setTitle(`${lpack.cur_disp} ${lpack.types[save.settings.extended_info]}.`)
                ],
            components:
                [new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('ext_menu')
                            .setPlaceholder(lpack.PH_menu)
                            .addOptions(types)
                    )
                ]
        });
    }
};