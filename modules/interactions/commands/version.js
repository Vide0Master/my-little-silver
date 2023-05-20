
//* Version от VideoMaster

const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const inf = require('../../../config/techInfo.json')
const fs = require('node:fs');
const versionFiles = fs.readdirSync('config/versions').reverse()
const current = JSON.parse(fs.readFileSync(`config/versions/${versionFiles[0]}`))
const LI = require('../../lines/lineInteract.js')
const SI = require('../../saves/saveInteract.js')

module.exports = {
    settings: { active: true, public: true },
    command: new SlashCommandBuilder()
        .setName('version')
        .setDescription('Get info about Silver current and older versions.'),
    async execute(interaction) {
        const lpack = LI.getLine("system.interactions.version_menu", SI.getSave(interaction.user.id, "user").settings.lang)
        let vers = [];
        versionFiles.forEach((file) => {
            const aver = JSON.parse(fs.readFileSync(`config/versions/${file}`))
            vers.push({
                label: `${aver.ver} - ${aver.title}`,
                value: file
            })
        })
        await interaction.reply({
            embeds:
                [new EmbedBuilder()
                    .setColor(0x0096c8)
                    .setTitle(`${lpack.last_ver} v${current.ver} | ${current.title}`)
                    .setDescription(current.description)
                ],
            components:
                [new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('version_menu')
                            .setPlaceholder(lpack.ver_sel)
                            .addOptions(vers)
                    )
                ]

        })
    }
};