const config = require('../../config.json');

const cooldowns = new Map();


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

    
    if (command.name === 'ok') return;
    // Comment this if you don't need embeds since it should be uncommented in the main.js
    if (command.name === 'reaction-roles') return;
        
    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if(time_stamps.has(msg.author.id)) {
        const expiration_time = time_stamps.get(msg.author.id) + cooldown_amount;
        if(current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;

            return msg.reply(`Hold tf up, you can use **${command.name}** agane in **${time_left.toFixed(1)}** seconds`);
        }
    }

    time_stamps.set(msg.author.id, current_time);
    setTimeout(() => time_stamps.delete(msg.author.id), cooldown_amount);
    

    try {
        command.execute(client, msg, args, Discord);
    } catch (err) {
        msg.channel.send("Uh oh, stinky error happened :o");
        console.log(err);
    }
        
}