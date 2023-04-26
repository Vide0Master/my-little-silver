
//* bot_info от VideoMaster

const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const inf = require('../../../config/techInfo.json')
const LI = require('../../lines/lineInteract')
const SI = require('../../saves/saveInteract')

module.exports = {
    settings:{active:true,public:true},
    command: new SlashCommandBuilder()
        .setName('bot_info')
        .setDescription('Узнайте информацию о боте!'),
    async execute(interaction) {
        const lpack = LI.getLine("system.interactions.bot_info",SI.getSave(interaction.user.id, "user").settings.lang)
        await interaction.reply({
            embeds:
                [new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(lpack.head)
                    .setDescription('...')
                    .setFooter({ text: "v"+inf.ver })
                ]
        })
    }
};