module.exports = {
    name: 'kick',
    aliases: ['yeet', 'boot'],
    permissions: ["KICK_MEMBERS", "ADMINISTRATOR"],
    description: 'yeet these mfs',
    execute(msg, args, cmd, client, Discord) {
        const member = msg.mentions.users.first();

        if (member) {
            const target = msg.guild.members.cache.get(member.id);
            target.kick();
            msg.channel.send('User <@' + member.id + '> has been yeeted! Pog.');
        } else
            msg.reply('kicked invisible man lessssssssss gooooo');
    }
}

