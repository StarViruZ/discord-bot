const fetch = require("node-fetch");

module.exports = {
    name: 'zelda',
    aliases: ['tloz'],
    cooldown: 10,
    permissions: [],
    description: 'Send random the legend of ur mom stuff',
    execute(msg, args, cmd, client, Discord) {

        fetch('https://meme-api.herokuapp.com/gimme/zelda').
        then(res => res.json())
            .then(data => { 
                const elMeme = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle(data.title)
                    .setURL(data.postLink)
                    .setImage(data.url)
                    .setFooter('powered by Ganon 😈');
                    msg.channel.send(elMeme);
            })
            .catch(error => msg.channel.send('internal error, pull harder the master sword idiot'));
    }
}