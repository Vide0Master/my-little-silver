
//* testCommand от VideoMaster

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	command: new SlashCommandBuilder()
		.setName('example')
		.setDescription('example command!'),
	async execute(interaction) {
		await interaction.reply('example response!');
	}
};