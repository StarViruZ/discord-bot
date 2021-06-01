module.exports = (Discord, client, msg) => {
    //if(msg.author.client) return;
    client.snipes.set(msg.channel.id, {
        content: msg.content,
        author: msg.author.tag,
        member: msg.member,
        image: msg.attachments.first() ? msg.attachments.first().proxyURL : null
    });

    const targetUsr = msg.mentions.users.first();
    if(targetUsr) {
        const embed = new Discord.MessageEmbed()
        .setAuthor('Ghost ping detected!', 'https://icons.iconarchive.com/icons/google/noto-emoji-smileys/1024/10100-ghost-icon.png')
        .setDescription(msg.content)
        .setFooter(`Idiot pinger: ${msg.author.tag}`)
        .setTimestamp();
        msg.channel.send(embed);
    }
}