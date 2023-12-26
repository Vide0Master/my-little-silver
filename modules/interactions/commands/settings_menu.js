
//* testCommand от VideoMaster

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const LI = require('../../lines/lineInteract')
const SI = require('../../saves/saveInteract')

module.exports = {
    settings: { active: true, public: false },
    command: new SlashCommandBuilder()
        .setName('settings_menu')
        .setDescription('Change setting of your bot!'),
    async execute(interaction) {
        const save = SI.getSave(interaction.user.id)
        const lpack = LI.getLine("system.interactions.settings_menu", save.user.settings.lang)

        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(0x3a34eb)
                .setTitle(lpack.title)
                .setDescription(lpack.desc)
            ],
            components: [new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('settings')
                    .setPlaceholder(lpack.placeholder)
                    .addOptions([
                        { label: lpack.options_list.lang, value: "language" },
                        { label: lpack.options_list.ext_inf, value: "ext_info" },
                        { label: lpack.options_list.contr_menu, value: "control_menu" }
                    ])
            )]
        });
    }
};