const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const moment = require("moment")
const { prefix } = require("../../config");
module.exports = {
    name: "serverinfo",
    description: "📁 View serverinfo",
    aliases: ["info"],
    usage: `\`${prefix}serverinfo\``,
    execute(client, msg, args) {
        msg.channel.send({"embed":{
            "title": "Server information",
            "fields": [
                {
                    "name": "**Data**",
                    "value": "**Name**\n**Owner**\n**Created At**\n**Member**",
                    "inline": true
                },
                {
                    "name": "**Info**",
                    "value": `${msg.guild.name}\n${msg.guild.owner}\n${moment(msg.guild.createdAt).format("DD/MM/YY")}\n${msg.guild.memberCount}`,
                    "inline": true
                }
            ],
            "thumbnail": {
                "url": msg.guild.iconURL
            },
            "timestamp": msg.createdAt,
            "color": Colour(102, 255, 102)
        }});
    }}