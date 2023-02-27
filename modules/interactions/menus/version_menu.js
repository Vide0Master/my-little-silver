const fs = require('node:fs');
const { EmbedBuilder } = require('discord.js');

module.exports = function (interaction) {
    const current = JSON.parse(fs.readFileSync(`config/versions/${interaction.values[0]}`))
    interaction.update({
        embeds:
            [new EmbedBuilder()
                .setColor(0x0096c8)
                .setTitle(`Текущая версия v${current.ver}: ${current.title}`)
                .setDescription(current.description)
            ]
    })
}