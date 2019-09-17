const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const { prefix } = require("../../config");

module.exports = {
	name: "help",
	description: "🧐 Need a little help?",
	aliases: ["cmds", "cmdlist"],
	execute: (client, msg, args) => {
		if (!args[0]) {
			const longest = client.commands.map(c=>c.file.name).reduce((long, str) => Math.max(long, str.length), 0);
			let out = `Use \`${prefix}help [CommandName]\` for more information on a command.\n\n`;
			const { commands, categories } = msg.client;
			for (x of categories) {
				out += `**${x.charAt(0).toUpperCase() + x.substr(1)} Commands**\n\`\`\`asciidoc\n${commands.filter(command => command.category === x).map(command => `${command.file.name}${" ".repeat(longest - command.file.name.length)} :: ${command.file.description}`).join('\n')}\`\`\`\n\n`
			}
			return msg.channel.send(new Embed(
				"Commands List",
				out,
				Colour(102, 255, 102)
			));
		} else {
			let command = args[0];
			if (client.commands.has(command)) {
				command = client.commands.get(command);
				const longest = 8;
				return msg.channel.send(new Embed(
					`Command Help`,
					`\`\`\`asciidoc\nCommand${" ".repeat(longest-7)} :: ${command.file.name}\nCategory${" ".repeat(longest-8)} :: ${command.category}\nCooldown${" ".repeat(longest-8)} :: ${command.file.cooldown ? `${command.file.cooldown} Seconds` : "3 Seconds"}\n\nUsage ::\n${command.file.usage || "Not Specified"}\n\nDescription ::\n${command.file.description}\`\`\``,
					Colour(102, 255, 102)
				));
			} else {
				msg.delete(500);
				return msg.channel.send(new Embed(
					"Hold Up?",
					`${command} is not a valid command, ${msg.author}.\n\n${module.exports.usage}`,
					Colour(255, 102, 102)
				)).then(m=>m.delete(7000));
			}
		}
	}
}