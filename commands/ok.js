const { Message } = require("discord.js");

module.exports = {
    name: 'ok',
    description: 'okay',
    execute(client, msg, args, Discord) {
        msg.channel.send('ok');
    }
}