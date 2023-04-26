
//* bot_info от VideoMaster

const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const inf = require('../../../config/techInfo.json')
module.exports = {
    settings:{active:true,public:true},
    command: new SlashCommandBuilder()
        .setName('bot_info')
        .setDescription('Узнайте информацию о боте!'),
    async execute(interaction) {
        await interaction.reply({
            embeds:
                [new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle('Информация про бота My little Silver')
                    .setDescription('...')
                    .setFooter({ text: "v"+inf.ver })
                ]
        })
    }
};