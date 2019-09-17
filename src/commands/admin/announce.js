const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const { prefix } = require("../../config");
module.exports = {
    name: "announce",
    description: "😅 Post announcement",
    aliases: ["post", "n"],
    usage: `\n${prefix}announce\n`,
    execute(client, msg, args){
        if(!msg.member.permissions.has("ADMINISTRATOR")){msg.reply("You Don't have permission to use that command")}
        const announces = args.join(" ");
        if (announces.length === 0) return msg.channel.send(new Embed(
            "Hold up?",
            "You need to put a text",
            Colour(255, 102, 102)
        ))
        if(msg.member.permissions.has("ADMINISTRATOR")){
            msg.channel.send(new Embed(
                "New announcement",
                `Here: ${announces}`,
                Colour(102, 255, 102),
                msg.delete(300),
            msg.channel.send('@everyone')
            ))
        }
        }
    }
