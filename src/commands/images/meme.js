const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const { prefix } = require("../../config");

const delay = require("util").promisify(setTimeout);

const { get } = require("snekfetch");

let templates = [];

function getMeme(name) {
    return templates.find(m => m.name.toLowerCase() === name.toLowerCase());
}

function cleanInput(input) {
    if (!input) return '';
    return input.replace(/"/g, '\'\'').replace(/#/g, '~h')
        .replace(/-/g, '--').replace(/_/g, '__')
        .replace(/ /g, '_').replace(/\?/g, '~q')
        .replace(/%/g, '~p').replace(/\//g, '~s');
}

function _loadMeme(url) {
	return get(url).then(res => {
		let singleData = res.body

		templates.push({
			name: url.replace(/https:\/\/memegen\.link\/api\/templates\/(.*)/, '$1'),
			url: url.replace('/api/templates', ''),
			styles: singleData.styles
		});
	});
}

get("https://memegen.link/templates/").then(({body}) => {
	templates = [];
	let promises = [];

	for (let key in body) {
		promises.push(_loadMeme(body[key]));
	}

	Promise.all(promises).then(() => {
		templates = templates.filter(e => !!e);
		templates.sort((a, b) => a.name.localeCompare(b.name));
	}).catch(console.error);
});

module.exports = {
	name: "meme",
	description: "👀 Let's find some content.",
	aliases: [],
	usage: `\`${prefix}meme\``,
	usage2: `\`${prefix}meme list\``,
	usage3: `\`${prefix}meme info <meme>\`\n\`${prefix}meme info disastergirl\``,
	usage4: `\`${prefix}meme <name> | <line 1> | <line 2> | [style]\`\n\`${prefix}meme trump | ban guns | build walls\``,
	execute: (client, msg, args) => {
		if(templates.length<1) {
			msg.delete(500);
			return msg.channel.send(new Embed(
				"Woah!",
				`Looks like we haven't loaded in all the memes yet, ${msg.author}. Please wait.`,
				Colour(255, 102, 102)
			)).then(m=>m.delete(7000));
		}

		if(args[0]=="list") {
			return msg.channel.send(new Embed(
				"Available Memes",
				`${msg.author}, here is a list of memes:\n\n${templates.map(meme => `- \`${meme.name}\``).join('\n')}\n\n**This message will :bomb: in 15 seconds.**`,
				Colour(102, 255, 102)
			)).then(m=>m.delete(15000));
		}
		if(args[0]=="info") {
			if(args.length<2) {
				msg.delete(500);
				return msg.channel.send(new Embed(
					"Hold Up?",
					`Maybe you should specify a meme, ${msg.author}!\n\n${module.exports.usage3}`,
					Colour(255, 102, 102)
				)).then(m=>m.delete(7000));
			}

			let info = getMeme(args[1]);
        	if (!info) {
				msg.delete(500);
				return msg.channel.send(new Embed(
					"Hold Up?",
					`That isn't a valid meme, ${msg.author}!\n\n${module.exports.usage2}`,
					Colour(255, 102, 102)
				)).then(m=>m.delete(7000));
			}

			return msg.channel.send(new Embed(
				`Meme Information - ${info.name}`,
				`Available Styles:\n${info.styles && info.styles > 1 ? info.styles.map(s => `\n- \`${s}\``).join("") : "None"}`,
				Colour(102, 255, 102)
			));
		}

		let input = args.join(' ');
		let parts = input.split('|').map(p => p.trim());
		
		if(args.length<1) {
			msg.delete(500);
			return msg.channel.send(new Embed(
				"Hold Up?",
				`You didn't provide a meme, ${msg.author}!\n\n${module.exports.usage2}\n\n${module.exports.usage4}`,
				Colour(255, 102, 102)
			)).then(m=>m.delete(7000));
		}

		let meme = getMeme(args[0]);
    	if (!meme) {
			msg.delete(500);
			return msg.channel.send(new Embed(
				"Hold Up?",
				`That isn't a valid meme, ${msg.author}!\n\n${module.exports.usage2}\n\n${module.exports.usage4}`,
				Colour(255, 102, 102)
			)).then(m=>m.delete(7000));
		}

		if(parts.length<3) {
			msg.delete(500);
			return msg.channel.send(new Embed(
				"Hold Up?",
				`No message was provided, ${msg.author}!\n\n${module.exports.usage4}`,
				Colour(255, 102, 102)
			)).then(m=>m.delete(7000));
		}

		let topText = cleanInput(parts[1]);
		let bottomText = cleanInput(parts[2]);
		
		if(!topText || !bottomText) {
			msg.delete(500);
			return msg.channel.send(new Embed(
				"Hold Up?",
				`You're missing some text, ${msg.author}!\n\n${module.exports.usage4}`,
				Colour(255, 102, 102)
			)).then(m=>m.delete(7000));
		}

		let url = `${meme.url}/${cleanInput(parts[1])}/${cleanInput(parts[2])}.jpg`;
		if (parts[3]) url += `?alt=${encodeURIComponent(parts[3])}`;
		
		msg.channel.send(new Embed(
			"Loading",
			"Generating your meme...",
			Colour(255, 255, 102)
		)).then(m => {
			delay(2000).then(() => {
				m.edit({"embed": {
					"title": `${msg.member.displayName}'s Meme`,
					"image": {
						"url": url
					},
					"color": Colour(102, 255, 102)
				}});
			});
		});
	}
}