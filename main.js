const config = require('./config.json');

const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '$';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const cmd = require(`./commands/${file}`);

    client.commands.set(cmd.name, cmd);
}

client.once('ready', () => {
    console.log('Your mom is alive');
});

client.on('message', msg => {
    if (msg.content.toLowerCase() == 'ok' && !msg.author.bot) {
        client.commands.get('ok').execute(msg);
        return;
    }
    if(!msg.content.startsWith(prefix) || msg.author.bot)
        return;
    
    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    
        if (cmd === 'ping')
            msg.channel.send('Fuck you');
        else if (cmd == 'pingabitch')
            client.commands.get('pingabitch').execute(msg);
        else if (cmd == 'clown')
            client.commands.get('clown').execute(msg, args);
        else if (cmd == 'mlg')
            client.commands.get('mlg-embed').execute(msg, args, Discord);
        else if (cmd == 'delet')
            client.commands.get('delet').execute(msg, args);
        else if (cmd == 'yeet')
            client.commands.get('kick').execute(msg, args);
        else if (cmd == 'bonk')
            client.commands.get('ban').execute(msg, args);
        else if (cmd == 'shut')
            client.commands.get('mute').execute(msg, args);

});


// -- Login -- //

client.login(process.env.TOKEN);
// client.destroy();