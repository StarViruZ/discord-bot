module.exports = {
    name: 'leave',
    aliases: ['stop'],
    cooldown: 5,
    description: 'stop the song cos its cringe',
    async execute(client, msg, args, Discord) {
        const voiceChannel = msg.member.voice.channel;

        if(!voiceChannel)
            return msg.channel.send('You can\'t stop if you don\'t know what to stop. **Think *Mark* T H I N K**');
        
        await voiceChannel.leave();
        await msg.channel.send('Fuck outta here this place is cringe');
    }
}