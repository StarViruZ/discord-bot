// const config = require('../../config.json');

module.exports = (Discord, client, msg) => {
    const prefix = '$';

    if (msg.content.toLowerCase() == 'ok' && !msg.author.bot) {
        client.commands.get('ok').execute(client, msg, null, Discord);
        return;
    }
    if(!msg.content.startsWith(prefix) || msg.author.bot)
        return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (command)
        command.execute(client, msg, args, Discord);
        
}