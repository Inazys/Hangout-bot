const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const { prefix } = require("../../config");
const responses = ["Hela small", "Hela big", "Normal", "Cancer", "Mega mega big", "Like ant"];

function getResponse() {return responses[Math.floor(Math.random()*responses.length)]}
module.exports = {
    name: "pp",
    description: "🤣 pp size",
    aliases: ["pp", "size"],
    usage: `\n${prefix}pp\n`,
    execute(client, msg, args){
        msg.channel.send(new Embed(
            "Your pp size",
            `Your pp is ${getResponse()}`,
            Colour(252, 3, 206),
        ))
    }
}