var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
      headless: true,
    },
  });

module.exports = {
    name: 'image',
    aliases: ['img', 'pic', 'google'],
    description: 'search a random ass pic',
    async execute(client, msg, args){
        const query = args.join(' ');
        if(!query)
            return msg.channel.send('Searching nothing... Found 0 results! (no shit...)');

        msg.channel.send(`Searching **${query}**...`);
        const results = await google.scrape(query, 1);
        msg.channel.send(results[0].url);
    }
}