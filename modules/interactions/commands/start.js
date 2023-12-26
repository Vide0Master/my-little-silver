
//* testCommand от VideoMaster

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const LI = require('../../lines/lineInteract')
const SI = require('../../saves/saveInteract')

module.exports = {
    settings: { active: true, public: false },
    command: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Start the bot!'),
    async execute(interaction) {
        let save = SI.getSave(interaction.user.id)
        const lpack = LI.getLine("system.interactions.start", save.user.settings.lang)
        let embd
        switch (save.meta.state) {
            case "unactive": {
                embd = [new EmbedBuilder()
                    .setColor(0x00ff00)
                    .setTitle(lpack.s_start.title)
                    .setDescription(lpack.s_start.desc)
                ]
            }; break;
            case "active": {
                embd = [new EmbedBuilder()
                    .setColor(0x34ebeb)
                    .setTitle(lpack.a_start.title)
                    .setDescription(lpack.a_start.desc)
                ]
            }; break;
        }
        await interaction.reply({ embeds: embd });
        save.meta.state = "active"
        SI.setSave(interaction.user.id, save)
    }
};