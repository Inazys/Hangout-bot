class Embed {
	constructor(title, description, colour) {
		if(!title) return console.error("No title was passed the Embed");
		if(!description) return console.error("No description was passed the Embed");
		if(!colour) return console.error("No colour was passed the Embed");
		
		return {"embed": {
			title: title,
			description: description,
			color: colour
		}};
	}
}

module.exports = Embed;