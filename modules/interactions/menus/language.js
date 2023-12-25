
//* language от VideoMaster

const fs = require('node:fs');
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const SI = require('../../saves/saveInteract.js')
const LI = require('../../lines/lineInteract.js')

module.exports = {
    async execute(interaction) {
        let sav = SI.getSave(interaction.user.id)
        sav.user.settings.lang = interaction.values[0]
        SI.setSave(interaction.user.id, sav)

        const user_lang = SI.getSave(interaction.user.id).user.settings.lang

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

        let ru_warn = new EmbedBuilder().setColor(0xff0000).setTitle('ВНИМАНИЕ').setDescription('Игру делает украинец, и предоставляет возможность играть в игру на русском языке.\nОн вам не скажет что вы вашисты или тому подобное, сам же "укронацист", не так ли?\nЕдинственное что разработчик хочет сказать это то что все хотят мир, разраб тоже хочет, что-бы жилось спокойнее.\n\nВозможно некоторый функционал бота будет ограничен для русского перевода.\nИ возможно некоторые ваши данные будут передаваться СБУ)))\nВсем пис.')
        let embd = new EmbedBuilder().setColor(0x0096c8).setTitle(`${lng_lines.CRL}: ${lng_lines.NM}`)
        let ready_embed
        if (user_lang == 'ru') {
            ready_embed = [ru_warn, embd]
        } else {
            ready_embed = [embd]
        }

        interaction.update({
            embeds:
                ready_embed,
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