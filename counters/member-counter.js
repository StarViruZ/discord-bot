module.exports = async (client) => {
    const server = client.guilds.cache.get('844038550684696597');
    setInterval(() => {
        const memberCount = server.memberCount;
        const channel = server.channels.cache.get('846160766649630720');

        channel.setName(`Population: ${memberCount.toLocaleString()}`);
        console.log('Updating member count. Now is ' + memberCount.toLocaleString());
    }, 600000); // 600,000ms = 10 mins
}