const config = require('./config.json');

const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = config.prefix;

const fs = require('fs');

const memberCounter = require('./counters/member-counter');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const cmd = require(`./commands/${file}`);

    client.commands.set(cmd.name, cmd);
}

client.once('ready', () => {
    console.log('Your mom is alive');
    memberCounter(client);
    
    // This should be running right away to keep the reaction roles working
    // Also the embed code should be commented to prevent unnecesary spam
    client.commands.get('reactionrole').execute(null, Discord, client);

    client.user.setPresence({ 
        activity: { 
            name: 'you as my bitch' }, 
        status: 'idle' 
    });  
});

client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Peasant');
    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('845897169243340850').send('A wild LVL ' + (Math.ceil(Math.random() * 100)) + ' <@' + guildMember.user.id + '> appeared! So ugly...');
});

client.on('guildMemberRemove', guildMember => {
    guildMember.guild.channels.cache.get('845897169243340850').send('mf <@' + guildMember.user.id + '> left without paying! Bankrupt here we go...');
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
    else if (cmd == 'langrole')
        // Should be used only if it's needed to send an embed message.
        // Also the embed code should be not commented in order to do this
        client.commands.get('reactionrole').execute(msg, Discord, client);
    else if (cmd == 'play')
        client.commands.get('play-music').execute(msg, args);
    else if (cmd == 'leave')
        client.commands.get('leave-music').execute(msg, args);

});


// -- Login -- //

client.login(config.token);
// client.destroy();