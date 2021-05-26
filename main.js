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
    client.commands.get('reaction-roles').execute(client, null, null, Discord);

    client.user.setPresence({ 
        activity: { 
            name: 'you as my bitch' }, 
        status: 'idle' 
    });  
});

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

// -- Login -- //

client.login(config.token);
// client.destroy();
