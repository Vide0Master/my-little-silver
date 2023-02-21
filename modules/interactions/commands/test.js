
//* testCommand от VideoMaster

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	command: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test command!'),
	async execute(interaction) {
		await interaction.reply('test response!');
	}
};