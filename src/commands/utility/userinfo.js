const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const { prefix } = require("../../config");

const moment = require("moment");

module.exports = {
    name: "userinfo",
    description: "😳 View a Discord user's information.",
	cooldown: 10,
	aliases: ["whois", "user"],
	usage: `\`${prefix}userinfo @Exhale\``,
    execute(client, msg, args) {
        let user = msg.mentions.members.first();
        if(user) {
            msg.channel.send({"embed":{
                "title": `Info for ${user.displayName}`,
                "fields": [
                    {
                        "name": "**Data**",
                        "value": "Username:\nID:\nJoined Discord:\nJoined Server:\nRoles:\nStatus:",
                        "inline": true
                    },
                    {
                        "name": "**Values**",
                        "value": `${user.user.tag}\n${user.user.id}\n${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}\n${moment(user.joinedAt).format("DD/MM/YY")}\n${user.roles.filter(r => r.name !== "@everyone").map(r => r.name).join(', ') || "None"}\n${user.presence.status}`,
                        "inline": true
                    }
                ],
                "thumbnail": {
                    "url": user.user.avatarURL
                },
                "timestamp": `${msg.createdAt}`,
				"color": Colour(102, 255, 102)
            }});
        } else {
			return msg.channel.send(new Embed(
				"Hold Up?",
				`You didn't specify a user!\n\n${module.exports.usage}`,
				Colour(255, 102, 102)
			))
		}
    }
}