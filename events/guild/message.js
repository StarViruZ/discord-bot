const config = require('../../config.json');

module.exports = (Discord, client, msg) => {
    const prefix = config.prefix;

    if (msg.content.toLowerCase() == 'ok' && !msg.author.bot) {
        client.commands.get('ok').execute(client, msg, null, Discord);
        return;
    }
    if(!msg.content.startsWith(prefix) || msg.author.bot)
        return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (command) {
        if (command.name === 'ok') return;
        // Comment this if you don't need embeds since it should be uncommented in the main.js
        if (command.name === 'reaction-roles') return;
        
        command.execute(client, msg, args, Discord);
    }
        
}