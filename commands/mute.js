const ms = require('ms');

module.exports = {
    name: 'mute',
    aliases: ['shut', 'silence'],
    permissions: ["KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR"],
    description: 'shut that mf',
    async execute(client, msg, args, Discord) {
        const member = msg.mentions.users.first();

        if (member) {
            let mainRole = msg.guild.roles.cache.find(role => role.name === 'Peasant');
            let muteRole = msg.guild.roles.cache.find(role => role.name === 'Shut');
            
            let target = msg.guild.members.cache.get(member.id);
            
            if (target.roles.cache.some(r => { return r.name === 'Peasant'; })) {
                if (!args[1]) {
                    // console.log('manual shut');
                    target.roles.remove(mainRole.id);
                    target.roles.add(muteRole.id);
                    msg.channel.send(`<@${member.id}> shut!`);
                    msg.channel.send('https://tenor.com/view/shut-up-shush-shh-ok-bird-gif-17679708');
                    return;
                }
                target.roles.remove(mainRole.id);
                target.roles.add(muteRole.id);
                msg.channel.send(`<@${member.id}> has been shut for ${ms(ms(args[1]))}`);
                msg.channel.send('https://i.kym-cdn.com/photos/images/facebook/001/878/823/c98.png');    

                // console.log('timer set');
                setTimeout(function () {
                    console.log('timer over');
                    target.roles.remove(muteRole.id);
                    target.roles.add(mainRole.id);
                }, ms(args[1]));

            } else {
                // console.log('unshut');
                target.roles.remove(muteRole.id);
                target.roles.add(mainRole.id);
                msg.channel.send(`<@${member.id}> unshut!`);
                msg.channel.send('https://emoji.gg/assets/emoji/7122-unshut.png?t=1619805235');
            }

        } else
            msg.reply('tried shut nobody, guess they are gonna shut themselves');
    }
}