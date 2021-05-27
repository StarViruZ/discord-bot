module.exports = {
    name: 'ban',
    aliases: ['bonk', 'hammer'],
    permissions: ["BAN_MEMBERS", "ADMINISTRATOR"],
    description: 'kill these mfs outta existence',
    execute(client, msg, args, Discord) {
        const member = msg.mentions.users.first();

        if (member) {
            const target = msg.guild.members.cache.get(member.id);
            target.ban();
            msg.channel.send('User <@' + member.id + '> has been bonked for dumbo! Pog.');
        } else
            msg.reply('beaned invisible man lessssssssss gooooo');
    }
}