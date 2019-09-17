const Embed = require("../../util/embed");
const Colour = require("../../util/color");

module.exports = {
    name: "eval",
    description: "⚠ **Bot Developer Only** ⚠",
    cooldown: 0,
    execute(client, msg, args) {
        if (msg.author.id != "344035924222672897") {
			msg.delete(500);
			return msg.channel.send(new Embed(
				"Error",
				`You aren't the bot developer, ${msg.author}.`,
				Colour(255, 102, 102)
			));
		}
        try {
            const code = args.join(" ");
            let evaled = eval(code);
       
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
       
            
			msg.channel.send(new Embed(
				"Evaluated!",
				`\`\`\`\n${clean(evaled)}\n\`\`\``,
				Colour(102, 255, 102)
			)).catch((e) => {
				msg.channel.send(new Embed(
					"Error",
					"Returned length is >2000 chars. Can't send.",
					Colour(255, 102, 102)
				));
			});
          } catch (err) {
            return msg.channel.send(new Embed(
				"Hold Up?",
				`\`\`\`\n${clean(err)}\n\`\`\``,
				Colour(255, 102, 102)
			));
          }
    }
}

const clean = text => {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}