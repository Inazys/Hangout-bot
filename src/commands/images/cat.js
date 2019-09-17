const Embed = require("../../util/embed");
const Colour = require("../../util/color");

const { get } = require("snekfetch");

module.exports = {
    name: "cat",
    description: "🐱 Find a cat!",
    aliases: ["kit", "kitten", "meow"],
    execute(client, msg, args) {
		msg.channel.send(new Embed(
			"Loading",
			"Finding you a cat...",
			Colour(255, 255, 102)
		)).then(m => {
			get('https://aws.random.cat/meow').then(res => {
				return m.edit({
					"embed": {
						"title": `Kitty for ${msg.member.displayName}`,
						"image": {
							"url": res.body.file
						},
						"color": Colour(102, 255, 102)
					}
				});
			});
		});
    }
}