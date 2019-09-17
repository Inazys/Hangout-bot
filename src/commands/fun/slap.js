const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const { prefix } = require("../../config");
const gifs =  [
    "https://media1.tenor.com/images/d83626e7031b78c1fde67ccedc43ec01/tenor.gif",
    "https://media1.tenor.com/images/9ea4fb41d066737c0e3f2d626c13f230/tenor.gif",
    "https://media1.tenor.com/images/b3aae9bb30e3689ff9c06b4b0d61b7e1/tenor.gif",
    "https://media1.tenor.com/images/4a6b15b8d111255c77da57c735c79b44/tenor.gif",
    "https://media1.tenor.com/images/3fd96f4dcba48de453f2ab3acd657b53/tenor.gif",
    "https://media1.tenor.com/images/f9f121a46229ea904209a07cae362b3e/tenor.gif",
    "https://media1.tenor.com/images/d14969a21a96ec46f61770c50fccf24f/tenor.gif",
]
module.exports = {
    name: "slap",
    description: "Slap someone",
    aliases: ["kill", "fuck"],
    usage: `\n${prefix}slap @mentioned\n`,
    execute(client, msg, args){
        const slaps = Math.floor(Math.random() * (gifs.length -1) + 1);
        const mentioned = msg.mentions.members.first(); 
        if(msg.mentions.members.first()){
            msg.channel.send({"embed":{
                "title": "Slapped! xD",
                "fields": [
                    {
                        "name": "OOF",
                        "value": `@${msg.author.username} slapped! ${mentioned}`,
                        "inline": true
                    }
                ],
                "image": {
                    "url": `${gifs[slaps]}`
                },
                "color": Colour(102, 255, 102)
            }});
        } else {
            msg.channel.send('Please mention a user!')
        }

    }
}