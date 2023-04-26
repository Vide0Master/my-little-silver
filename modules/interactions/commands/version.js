
//* Version от VideoMaster

const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const inf = require('../../../config/techInfo.json')
const fs = require('node:fs');
const versionFiles = fs.readdirSync('config/versions').reverse()
const current = JSON.parse(fs.readFileSync(`config/versions/${versionFiles[0]}`))

module.exports = {
    settings:{active:true,public:true},
    command: new SlashCommandBuilder()
        .setName('version')
        .setDescription('Узнайте информацию о последнем и предыдущих обновлениях Сильвер!'),
    async execute(interaction) {
        let vers = [];
        versionFiles.forEach((file) => {
            const aver = JSON.parse(fs.readFileSync(`config/versions/${file}`))
            vers.push({
                label: aver.ver,
                description: aver.description,
                value: file
            })
        })
        await interaction.reply({
            embeds:
                [new EmbedBuilder()
                    .setColor(0x0096c8)
                    .setTitle(`Последняя версия v${current.ver} | ${current.title}`)
                    .setDescription(current.description)
                ],
            components:
                [new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('version_menu')
                            .setPlaceholder('Выберите версию для просмотра')
                            .addOptions(vers)
                    )
                ]

        })
    }
};