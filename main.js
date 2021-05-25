const config = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

// const fs = require('fs');
// const memberCounter = require('./counters/member-counter');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

// -- Login -- //

client.login(config.token);
// client.destroy();
