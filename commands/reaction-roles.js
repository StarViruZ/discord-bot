module.exports = {
    name: 'reactionrole',
    description: 'React to set a stupid role',
    async execute(msg, Discord, client) {
        const rolesChannel = '846146613004206130';
        const guild = client.guilds.cache.get('844038550684696597');

        // Remove msg. before 'guild' if you don't need send embeds
        const english = guild.roles.cache.find(role => role.name === 'English');
        const espanol = guild.roles.cache.find(role => role.name === 'Español');
        const flagus = '🇺🇸';
        const flagmx = '🇲🇽';

        // Use this only if u need to create an embed message in order to manage reactions
        /*
        const reactionEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('ROLES')
            .addFields(
                {name: 'English', value: 'React with the emotes below depending which languages do you speak in order to speak in the general channels'},
                {name: 'Español', value: 'Reacciona con los emojis abajo dependiendo de que idiomas puedes hablar para desbloquear los chats'}
            );


        let msgTarget = await msg.channel.send(reactionEmbed);
        msgTarget.react(flagus);
        msgTarget.react(flagmx);
        */

        // Adding reaction
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) 
                await reaction.message.fetch();
            if (reaction.message.partial) 
                await reaction.message.fetch();
            if (user.bot)
                return;
            if (!reaction.message.guild)
                return;

            if (reaction.message.channel.id = rolesChannel) {
                if (reaction.emoji.name === flagus) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(english);
                }
                if (reaction.emoji.name === flagmx) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(espanol);
                }
            } else
                return;

            
        });

        // Removing reaction
        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) 
                await reaction.message.fetch();
            if (reaction.message.partial) 
                await reaction.message.fetch();
            if (user.bot)
                return;
            if (!reaction.message.guild)
                return;

            if (reaction.message.channel.id = rolesChannel) {
                if (reaction.emoji.name === flagus) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(english);
                }
                if (reaction.emoji.name === flagmx) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(espanol);
                }
            } else
                return;

            
        });
    }
}