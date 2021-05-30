const { Message } = require("discord.js");

module.exports = {
    name: 'ok',
    description: 'okay',
    execute(msg, args, cmd, client, Discord) {
        msg.channel.send('ok');
    }
}