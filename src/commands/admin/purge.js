const Embed = require("../../util/embed");
const Colour = require("../../util/color");
const { prefix } = require("../../config");
module.exports = {
    name: "purge",
    description: "😅 Purge message",
    aliases: ["del", "p"],
    usage: `\n${prefix}purge <Number of delete message>\n`,
    execute(client, msg, args){
        if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send('You cannot use that command')
        if(msg.member.permissions.has("ADMINISTRATOR")){
        if(isNaN(args[0])) return msg.channel.send('Please specify number message to delete')
        if(args[0] > 100) return msg.channel.send('Please specify a number less than 100')
        msg.channel.bulkDelete(args[0])
            .then(msg.channel.send(`Deleted ${args[0]} message`))
    }
}
}