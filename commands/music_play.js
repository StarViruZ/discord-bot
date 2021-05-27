const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    cooldown: 5,
    description: 'play shit in youtube lol!',
    async execute(client, msg, args, Discord) {
        const voiceChannel = msg.member.voice.channel;

        if(!voiceChannel)
            return msg.channel.send('Yeah... u gotta join a voice channel first before doing that');
        
        const permissions = voiceChannel.permissionsFor(msg.client.user);

        if (!permissions.has('CONNECT'))
            return msg.channel.send('I can\'t connect to this voice channel idiot');
        if (!permissions.has('SPEAK'))
            return msg.channel.send('I can\'t speak to this voice channel idiot');
        
        if (!args.length)
            return msg.channel.send('ᴘʟᴀʏɪɴɢ: Who Asked (Feat: Nobody Did)\n' +
            '───────────:white_circle:──────\n' +
             '◄◄⠀▐▐⠀►► 𝟸:𝟷𝟾 / 𝟹:𝟻𝟼⠀───○ :loud_sound:');


        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }

        // Commented this shit cos i realized this was a waste of time and it's already validated in the later code below
        /*
        if (validURL(args[0])) {
            const  connection = await voiceChannel.join();
            const stream  = ytdl(args[0], {filter: 'audioonly'});
 
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
                msg.channel.send('Song\'s over, death');
            });
 
            await msg.channel.send(`ᴘʟᴀʏɪɴɢ: **${args[0]}**`)
 
            return;
        }
        */


        // Start to play music
        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        };

        const video = await videoFinder(args.join(' '));

        if(video) {
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
                .on('finish', () => {
                    voiceChannel.leave();
                    msg.channel.send('Song\'s over, death');
                });

            await msg.channel.send(`ᴘʟᴀʏɪɴɢ: **${video.title}**`);
        } else
            await msg.channel.send(`No results found smh`);
    
    }
}