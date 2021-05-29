const { Message } = require("discord.js");

module.exports = {
    name: 'clown',
    aliases: ['clownify'],
    cooldown: 5,
    permissions: ["MANAGE_ROLES", "ADMINISTRATOR"],
    description: 'become one even though you always were one',
    execute(client, msg, args, Discord) {

        const targetUsr = msg.mentions.users.first();

        if(!targetUsr) {
            msg.reply('Target an user u dummy :clown:');
            return;
        } else {

            // grab da role
            let role = msg.guild.roles.cache.find(r => { return r.name === "i identify as a clown 🤡"; });
            if (!role) {
                msg.reply('Clown role doesn\'t exist :sob:');
                return;
            } else {

                const member = msg.guild.members.cache.get(targetUsr.id);

                // if (msg.member.permissions.has("KICK_MEMBERS")) // check if someone can kick ppl
                //     msg.channel.send('You can yeet ppl');
                if (member.roles.cache.some(r => { return r.name === "i identify as a clown 🤡"; })) {
                    member.roles.remove(role).catch(console.error); // remove da role
                    msg.channel.send(`You can\'t leave us <@${member.id}>, you are always a clown :clown:`);
                } else {
                    member.roles.add(role).catch(console.error);   
                    msg.channel.send(`Welcome to the clown academy <@${member.id}> :clown:`); // add da role
                    msg.channel.send('https://tenor.com/view/yghkjg-walking-clown-college-gif-14768929');
                } 
            }
        }
    }
}