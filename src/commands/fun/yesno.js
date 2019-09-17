const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const { prefix } = require("../../config");

const responses = ["Yes", "No", "IDK", "Of cource"];

function getResponse() {return responses[Math.floor(Math.random()*responses.length)]}

module.exports = {
    name: "yesno",
    aliases: ["yes", "no"],
    description: "😏 Answer yes no for you",
    usage: `\n${prefix}yesno Should I buy pizza?\n`,
    execute:(client, msg, args) => {
        const question = args.join(" ");

		if (question.length === 0) return msg.channel.send(new Embed(
			"Hold Up?",
			`Maybe you should ask a question, ${msg.author}!\n\n${module.exports.usage}`,
			Colour(255, 102, 102)
		)).then(m=>m.delete(7000));

		return msg.channel.send(new Embed(
			"My Answers",
			`${msg.author} asked: \`${question}\`\n\n${getResponse()}`,
			Colour(102, 255, 102)
		));
	}
}