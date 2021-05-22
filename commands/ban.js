module.exports = {
    name: 'ban',
    description: 'kill these mfs outta existence',
    execute(msg, args) {
        const member = msg.mentions.users.first();

        if (member) {
            const target = msg.guild.members.cache.get(member.id);
            target.ban();
            msg.channel.send('User <@' + member.id + '> has been bonked for dumbo! Pog.');
        } else
            msg.reply('beaned invisible man lessssssssss gooooo');
    }
}