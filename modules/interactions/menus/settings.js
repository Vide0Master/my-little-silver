
//* settings menu redirect от VideoMaster

module.exports = {
    async execute(interaction) {
        require(`./${interaction.values[0]}.js`).execute(interaction)
    }
}