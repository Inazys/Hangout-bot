const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const { prefix } = require("../../config");

const responses =
["Yes!", "No", "Maybe?", "I'm not qualified to answer that...",
"Wait, what was the question?", "Almost definitely!", "Uh, no.",
"I don't get it?", "Possibly.", "I mean, sure?", "Haha, maybe.","More than likely, yes.",
"Uhhhhh...", "Is that even a question?"];

function getResponse() {return responses[Math.floor(Math.random()*responses.length)]}

module.exports = {
	name: "8ball",
	description: "😎 Now you too can predict the future!",
	aliases: ["predict", "guess"],
	usage: `\`${prefix}8ball <Question>\`\n\`${prefix}8ball Will it rain today?\``,
	execute: (client, msg, args) => {
		const question = args.join(" ");

		if (question.length === 0) return msg.channel.send(new Embed(
			"Hold Up?",
			`Maybe you should ask a question, ${msg.author}!\n\n${module.exports.usage}`,
			Colour(255, 102, 102)
		)).then(m=>m.delete(7000));

		return msg.channel.send(new Embed(
			"My Prediction",
			`${msg.author} asked: \`${question}\`\n\n${getResponse()}`,
			Colour(102, 255, 102)
		));
	}
}