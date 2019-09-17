const { Client } = require("discord.js-trio");
const config = require("./config");
const client = new Client(config);



client.login(config.auth["bot-token"]);

client.on('on', ()=> {
    client.user.setActivity('with friend', { type: "PLAYING" });
})