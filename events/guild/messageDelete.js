module.exports = (Discord, client, msg) => {
    //if(msg.author.client) return;
    client.snipes.set(msg.channel.id, {
        content: msg.content,
        author: msg.author.tag,
        member: msg.member,
        image: msg.attachments.first() ? msg.attachments.first().proxyURL : null
    });
}