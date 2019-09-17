const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const { prefix } = require("../../config");

module.exports = {
    name: "chill",
    description: "🤣 Your chill meter:D",
    aliases: ["chill"],
    usage: `\n${prefix}chill\n`,
    execute(client, msg, args){
        var min=1;
        var max=101;
        var random = Math.floor(Math.random() * (+max - +min));
        msg.channel.send(new Embed(
            "Chill measurement",
            `You are ${random}% chill cool`,
            Colour(3, 252, 123),
        ))
    }
}