
//* testCommand от VideoMaster

const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const inf = require('../../../config/techInfo.json')
module.exports = {
    command: new SlashCommandBuilder()
        .setName('bot-info')
        .setDescription('Узнайте информацию о боте!'),
    async execute(interaction) {
        await interaction.reply({
            embeds:
                [new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle('Информация про бота My little Silver')
                    .setDescription('...')
                    .setFooter({ text: inf.ver })
                ]
        })
    }
};