const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const prefix = require("../../config");
const { get } = require("snekfetch");

module.exports = {
    name: "mcskin",
    description: "😎 Find minecraft skin",
    aliases: ["mc", "skin"],
    usage: `\n${prefix}mcskin <Minecraft account name>\n`,
    execute(client, msg, args) {
        const request = require("request");
        const username = args.join(" ")
  
        var url = `https://minotar.net/armor/body/${username}/100.png`;
        request(url, function(err, response, body) {
            if(err) {

                msg.channel.send(err);
    
                return msg.reply("Error getting Minecraft User Skin...");
                }
                if (url = `https://minotar.net/armor/body/${username}/100.png`) {
                    msg.channel.send({"embed":{
                        "title": "Minecraft skin",
                        "fields": [
                            {
                                "name": "**Data**",
                                "value": "Skin",
                                "inline": true
                            },
                            {
                                "name": "**Info**",
                                "value": `Gained the skin of ${username}.`,
                                "inline": true
                            }
                        ],
                        "thumbnail": {
                            "url": `https://minotar.net/cube/${username}/100.png`
                        },
                        "image": {
                                "url": `https://minotar.net/armor/body/${username}/100.png`
                        },
                        "color": Colour(102, 255, 102)
                    }});
                }
                else {
                    msg.channel.send('We couldn\'t get the skin of that player. :frowning:')
                }

        })
        
    }}