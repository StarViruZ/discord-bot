const { Message } = require("discord.js");

module.exports = {
    name: 'pingabitch',
    aliases: ['pinglofty'],
    description: 'ping that mf of lofty',
    execute(client, msg, args, Discord) {

        if (msg.member.roles.cache.some(r => { return r.name === "i identify as a clown 🤡"; }))
            msg.channel.send('<@547209027998842882> mf');
        else
            msg.channel.send('you\'re not a clown unfortunately :pensive:');
    }
}