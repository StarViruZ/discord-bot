const fetch = require("node-fetch");

module.exports = {
    name: 'meme',
    aliases: ['meem', 'm'],
    cooldown: 10,
    permissions: [],
    description: 'Send cool memes i guess',
    execute(msg, args, cmd, client, Discord) {

        fetch('https://meme-api.herokuapp.com/gimme/dankmemes').
        then(res => res.json())
            .then(data => { 
                const elMeme = new Discord.MessageEmbed()
                    .setColor('#47ffbf')
                    .setTitle(data.title)
                    .setURL(data.postLink)
                    .setImage(data.url)
                    .setFooter('powered by ur mom 🤣🤣🤣');
                    msg.channel.send(elMeme);
            })
            .catch(error => msg.channel.send('internal error, try again noob'));
    }
}