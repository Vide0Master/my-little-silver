
//* testCommand от VideoMaster

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    settings:{active:false,public:true},
	command: new SlashCommandBuilder()
		.setName('example')
		.setDescription('example command!'),
	async execute(interaction) {
		await interaction.reply('example response!');
	}
};