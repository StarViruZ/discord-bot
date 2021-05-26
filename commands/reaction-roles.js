module.exports = {
    name: 'reaction-roles',
    description: 'React to set a stupid role',
    async execute(client, msg, args, Discord) {
        // console.log('Running reaction roles command');
        const rolesChannel = '846146613004206130';
        const nsfwChannel = '846931197203578881';
        const guild = client.guilds.cache.get('844038550684696597');
        
        // Remove msg. before 'guild' if you don't need send embeds
        const english = guild.roles.cache.find(role => role.name === 'English');
        const espanol = guild.roles.cache.find(role => role.name === 'Español');
        const nsfw = guild.roles.cache.find(role => role.name === 'nsfw channel access');
        const flagus = '🇺🇸';
        const flagmx = '🇲🇽';
        const flushed = '😳';

        // Use this only if u need to create an embed message in order to manage reactions
        
        /*
        const languagesEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('ROLES')
            .addFields(
                {name: 'English', value: 'React with the emotes below depending which languages do you speak in order to speak in the general channels'},
                {name: 'Español', value: 'Reacciona con los emojis abajo dependiendo de que idiomas puedes hablar para desbloquear los chats'}
            );

        const nsfwEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('NSFW')
            .addFields(
                {name: 'Channel access', value: 'In order to grant access the channel react to the emoji 😳 below, but ONLY if you have the proper age. If you are caught being underage and you have the role you\'ll be warned and blocked from the channel'},
            );

        let languagesMsgTarget = await msg.channel.send(languagesEmbed);
        let nsfwMsgTarget = await msg.channel.send(nsfwEmbed);
        languagesMsgTarget.react(flagus);
        languagesMsgTarget.react(flagmx);
        nsfwMsgTarget.react(flushed);
        */
        

        // Adding reaction
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) 
                await reaction.message.fetch();
            if (reaction.partial) 
                await reaction.fetch();
            if (user.bot)
                return;
            if (!reaction.message.guild)
                return;

            if (reaction.message.channel.id = rolesChannel) {
                // No fucking idea why it reachs here in a different channel, guess i'll use different emotes for now
                if (reaction.emoji.name === flagus) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(english);
                }
                if (reaction.emoji.name === flagmx) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(espanol);
                }
                if (reaction.emoji.name === flushed) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(nsfw);
                }
            } else if (reaction.message.channel.id = nsfwChannel) {
                if (reaction.emoji.name === flushed) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(nsfw);
                }
            } else
                return;

            
        });

        // Removing reaction
        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) 
                await reaction.message.fetch();
            if (reaction.partial) 
                await reaction.fetch();
            if (user.bot)
                return;
            if (!reaction.message.guild)
                return;

            if (reaction.message.channel.id = rolesChannel) {
                // No fucking idea why it reachs here in a different channel, guess i'll use different emotes for now
                if (reaction.emoji.name === flagus) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(english);
                }
                if (reaction.emoji.name === flagmx) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(espanol);
                }
                if (reaction.emoji.name === flushed) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(nsfw);
                }
            } else if (reaction.message.channel.id = nsfwChannel) {
                if (reaction.emoji.name === flushed) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(nsfw);
                }
            } else
                return;

            
        });
    }
}