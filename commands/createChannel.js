module.exports = {
    name: 'newChannel',
    aliases: ['nc'],
    permissions: ["MANAGE_CHANNELS", "SEND_MESSAGES", "ADMINISTRATOR"],
    description: 'destruction makes creation',
    execute(msg, args, cmd, client, Discord) {
        const member = msg.mentions.users.first();

        if (member) {
            const target = msg.guild.members.cache.get(member.id);
            target.ban();
            msg.channel.send('User <@' + member.id + '> has been bonked for dumbo! Pog.');
        } else
            msg.reply('beaned invisible man lessssssssss gooooo');
    }
}