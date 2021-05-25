const { Message } = require("discord.js");

module.exports = {
    name: 'delet',
    description: 'restore balance in the universe',
    async execute(client, msg, args, Discord) {
        if(!args[0])
            return msg.reply('Better tell me how many messages should I clear bruh');
        if(isNaN(args[0]))
            return msg.reply('I dont speak amogus, say numbers ffs');
        if(args[0] > 100)
            return msg.reply('Aint gonna delet ur whole pornhub history');
        if(args[0] < 0) {
            msg.channel.send('Generating ' + Math.abs(args[0]) + ' messages. wait what? 🤦‍♂️');
            for (i = 1; i <= Math.abs(args[0]); i++)
                msg.reply('[' + i + '] bruh');
            return msg.channel.send('Generated ' + Math.abs(args[0]) + ' messages. What a dumbhead 😂');
        }

        await msg.channel.messages.fetch({limit: args[0]}).then(messages => {
            msg.channel.bulkDelete(messages);
            msg.channel.send('Snapped ' + args[0] + ' messages in order to restore balance in this channel.');
        });
    }
}