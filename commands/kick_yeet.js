module.exports = {
    name: 'yeet',
    description: 'yeet these mfs',
    execute(client, msg, args, Discord) {
        const member = msg.mentions.users.first();

        if (member) {
            const target = msg.guild.members.cache.get(member.id);
            target.kick();
            msg.channel.send('User <@' + member.id + '> has been yeeted! Pog.');
        } else
            msg.reply('kicked invisible man lessssssssss gooooo');
    }
}

