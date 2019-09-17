const Embed = require("../../util/embed");
const Colour = require("../../util/color");

const { get } = require("snekfetch");

module.exports = {
    name: "dog",
    description: "🐶 Find a doggo!",
    aliases: ["doggo", "woof"],
    execute(client, msg, args) {
		msg.channel.send(new Embed(
			"Loading",
			"Finding you a doggo...",
			Colour(255, 255, 102)
		)).then(m => {
			get('https://random.dog/woof').then(res => {
				return m.edit({
					"embed": {
						"title": `Doggo for ${msg.member.displayName}`,
						"image": {
							"url": `http://random.dog/${res.body}`
						},
						"color": Colour(102, 255, 102)
					}
				});
			});
		});
    }
}