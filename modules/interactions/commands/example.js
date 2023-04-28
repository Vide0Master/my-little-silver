
//* testCommand от VideoMaster

const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const LI = require('../../lines/lineInteract')
const SI = require('../../saves/saveInteract')

module.exports = {
    settings:{active:false,public:false},
	command: new SlashCommandBuilder()
		.setName('example')
		.setDescription('example command!'),
	async execute(interaction) {        
        const lpack = LI.getLine("system.interactions.example",SI.getSave(interaction.user.id, "user").settings.lang)
		await interaction.reply(lpack.ER);
	}
};