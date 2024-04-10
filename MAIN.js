const {Client, GatewayIntentBits, Events} = require("discord.js");

const client = new Client
({
    intents:
    [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ]
}); 

client.login(require("./config/token.json"));

client.once("ready",  async () =>
{
    var text = "SANYA"
    console.log("HI");
    const channel1 = await client.channels.fetch("381925001558884353");
    channel1.send(`"GAT" \n zzzz ${text}`);
});
