module.exports = {
    name: 'embed',
    aliases: ['mlg', 'mlg-embed'],
    cooldown: 0,
    permissions: [],
    description: 'Embed shit with dank memes',
    execute(msg, args, cmd, client, Discord) {
        const someEmbed = new Discord.MessageEmbed()
            .setColor('#FF4444')
            .setTitle('Sample text (its a link obviously so fucking click here ~~please or i die of 420 quickscope~~ u lvl 2 spear goblin)')
            .setURL('https://www.youtube.com/watch?v=9xx3xNlK06A')
            .setDescription('U FOCKIN WOT M8, U HAVING A GIGGLE CHEEKY CUNT?!!?11')
            .addFields(
                {name: 'Doritos', value: 'very dank sweg fod'},
                {name: 'Mtn DEW', value: 'unlimited 360noscopezz'},
                {name: 'dank blunt', value: '##420blazeit'}
            )
            .setImage('https://i.ytimg.com/vi/Udt9yNHJFQU/hqdefault.jpg')
            .setFooter('who tf read this no one cares lmao 😂😂😂');

            msg.channel.send(someEmbed);
    }
}