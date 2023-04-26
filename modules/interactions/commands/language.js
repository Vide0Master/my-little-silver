
//* language от VideoMaster

const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const LI = require('../../lines/LineInteract.js')
const SI = require('../../saves/saveInteract.js')

module.exports = {
    settings: { active: true, public: false },
    command: new SlashCommandBuilder()
        .setName('language')
        .setDescription('Выбор языка'),
    async execute(interaction) {
        const user_lang = SI.getSave(interaction.user.id, "user").settings.lang
        let languages = []
        const lngs = LI.getLangs().l
        lngs.forEach((line) => {
            const lng = LI.getLine('system.interactions.language.NM', line)
            languages.push({
                label: lng,
                value: line
            })
        })

        await interaction.reply({
            components:
                [new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('language')
                            .setPlaceholder(LI.getLine('system.interactions.language.CL', user_lang))
                            .addOptions(languages)
                    )
                ]

        });
    }
};