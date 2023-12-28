
//* version menu от VideoMaster

const fs = require('node:fs');
const { EmbedBuilder } = require('discord.js');

module.exports =  {
    async execute(interaction){
        const current = JSON.parse(fs.readFileSync(`config/versions/${interaction.values[0]}`))
        await interaction.update({
        embeds:
            [new EmbedBuilder()
                .setColor(0x0096c8)
                .setTitle(`${current.ver} | ${current.title}`)
                .setDescription(current.description)
            ]
    })
    }
}