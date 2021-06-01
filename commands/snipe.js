module.exports = {
    name: 'snipe',
    aliases: ['lastmessage', 'undo'],
    cooldown: 0,
    permissions: [],
    description: 'Nobody can hide from me muahahaha',
    execute(msg, args, cmd, client, Discord){
        const message = client.snipes.get(msg.channel.id);
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author, message.member.user.displayAvatarURL())
        .setDescription(message.content)
        .setFooter('Get noscoped lol!')
        .setTimestamp();
        msg.channel.send(embed);
    }
}