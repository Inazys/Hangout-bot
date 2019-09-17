const Embed = require("../../util/embed");
const Colour = require("../../util/color");

module.exports = {
    name: "say",
    description: "⚠ Only bot developer can use this ⚠",
    aliases: ["speak", "write", "s"],
    cooldown: 0,
    execute(client, msg, args) {
        const say = args.join(" ")
        if(msg.author.id === '344035924222672897'){
            msg.channel.send(`${say}`)
            msg.delete(0);
        }
    }
}