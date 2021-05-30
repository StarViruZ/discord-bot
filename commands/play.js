const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

// Saving queued songs in every serber
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop'], 
    cooldown: 0,
    permissions: [],
    description: 'Advanced music bot',
    async execute(msg, args, cmd, client, Discord){


        // Checking permissions
        const voice_channel = msg.member.voice.channel;
        if (!voice_channel) 
            return msg.channel.send('Get into a voice channel first, I don\'t wanna stay alone u.u');
        const permissions = voice_channel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT'))
            return msg.channel.send('Rip I can\'t enter to this channel :/');
        if (!permissions.has('SPEAK')) 
            return msg.channel.send('Bitch first remove the flex tape on your mouth >:(');

        // Server queue aka global queue in all servers.
        const server_queue = queue.get(msg.guild.id);

        //If command is 'play'
        if (cmd === 'play'){
            if (!args.length) 
                return msg.channel.send('ᴘʟᴀʏɪɴɢ: Who Asked (Feat: Nobody Did)\n' +
                '───────────:white_circle:──────\n' +
                '◄◄⠀▐▐⠀►► 𝟸:𝟷𝟾 / 𝟹:𝟻𝟼⠀───○ :loud_sound:');
            let song = {};

            // If its a link. Save Title and URL.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                // If theres no link, it will use keywords to search for a video. Also Save Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                     msg.channel.send('Oh fuck there was an error finding da video :(');
                }
            }

            // If server queue doesnt exist (aka first time) then create constructor to add in the global queue
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: msg.channel,
                    connection: null,
                    songs: []
                }
                
                // Add server id to the global queue.
                queue.set(msg.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                // Establish a connection and play the songs.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(msg.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(msg.guild.id);
                    msg.channel.send('Ah shit there was an error while trying to connect :c');
                    throw err;
                }
            } else {
                server_queue.songs.push(song);
                return msg.channel.send(`ᴀᴅᴅᴇᴅ ᴛᴏ ᴛʜᴇ ǫᴜᴇᴜᴇ: **${song.title}**`);
            }
        }

        // Skip or stop cringe songs
        else 
            if(cmd === 'skip') skip_song(msg, server_queue);
        else
            if(cmd === 'stop') stop_song(msg, server_queue);
    }
    
}

// Outside methods

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    // If theres no songs queued in the server then leave the vc and delete any links to the global queue
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`ɴᴏᴡ ᴘʟᴀʏɪɴɢ: **${song.title}**`);
}

const skip_song = (msg, server_queue) => {
    if (!msg.member.voice.channel) 
        return msg.channel.send('Get into a voice channel first, I don\'t wanna stay alone u.u');
    if(!server_queue){
        return msg.channel.send(`There are no songs in queue '_'`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (msg, server_queue) => {
    if (!msg.member.voice.channel) 
        return msg.channel.send('Get into a voice channel first, I don\'t wanna stay alone u.u');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}