const config = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

// const fs = require('fs');
const memberCounter = require('./counters/member-counter');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.once('ready', () => {
    console.log('Alive bot');
    memberCounter(client);
    
    // This should be running right away to keep the reaction roles working
    // Also the embed code should be commented to prevent unnecesary spam
    client.commands.get('reaction-roles').execute(null, null, null, client, Discord);

    

    const arrayOfStatus = [
        `In ${client.guilds.cache.size} servers`,
        `${client.channels.cache.size} channels in total`,
        `${client.users.cache.size} users accessing the bot`,
        `stop looking at this status u mad sus ffs`
    ];

    let index = 0;
    setInterval(() => {
        if(index === arrayOfStatus.length)
            index = 0;

        const status = arrayOfStatus[index];
        // console.log(status);
        client.user.setActivity(status);
        index++;
    }, 7000);

    /*
        client.user.setPresence({ 
            // activity: { name: 'you as my bitch' }, 
            status: 'idle' 
        });
    */  
});

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

// -- Login -- //

client.login(config.token);
// client.destroy();
