const { Message } = require("discord.js")

module.exports = {
    name: 'ok',
    description: 'okay',
    execute(msg) {
        msg.channel.send('ok');
    }
}