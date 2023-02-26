
//* Version от VideoMaster

const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const inf = require('../../../config/techInfo.json')
const fs = require('node:fs');
const versionFiles=fs.readdirSync('config/versions').reverse()
const current=JSON.parse(fs.readFileSync(`config/versions/${versionFiles[0]}`))

module.exports = {
    command: new SlashCommandBuilder()
        .setName('version')
        .setDescription('Узнайте информацию о последнем и предыдущих обновлениях Сильвер!'),
    async execute(interaction) {
        await interaction.reply({
            embeds:
                [new EmbedBuilder()
                    .setColor(0x0096c8)
                    .setTitle(`Текущая версия v${current.ver}: ${current.title}`)
                    .setDescription(current.description)
                ]
        })
    }
};