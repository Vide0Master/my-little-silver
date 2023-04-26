
//* language от VideoMaster

const fs = require('node:fs');
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const SI = require('../../saves/saveInteract.js')
const LI = require('../../lines/lineInteract.js')

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

        let ru_warn=new EmbedBuilder().setColor(0xff0000).setTitle('ВНИМАНИЕ').setDescription('Ваш выбранный язык русский!\nВсе разработчики игры - украинцы, добавлять в игру русский язык было сложным решением, но всё же мы предоставляем сервис русским игрокам\nГлавный разработчик чуть более лоялен к россиянам, второй разработчик не очень, учтите это.\n\nПредупреждение!\nИграя в эту игру вы можете коственным путём предоставлять данные Службе безопасности Украины, Главному управлению разведки Министерства обороны Украины, а так же Вооружённым силам Украины.\nЕсли вас обвинят в пособничестве ВСУ - это вне компентецении разработчиков.')
        let embd=new EmbedBuilder().setColor(0x0096c8).setTitle(`${lng_lines.CRL}: ${lng_lines.NM}`)
        let ready_embed
        if(user_lang=='ru'){
            ready_embed=[ru_warn,embd]
        }else{
            ready_embed=[embd]
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