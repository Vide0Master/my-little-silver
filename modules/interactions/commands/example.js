
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
        let save=SI.getSave(interaction.user.id)
        const lpack = LI.getLine("system.interactions.example", save.user.settings.lang)
        await interaction.reply(lpack.ER);
    }
};