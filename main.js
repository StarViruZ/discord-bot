const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
require('dotenv').config();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.on("ready", () => {
    client.user.setPresence({ 
         activity: 
         { name: 'ok' }, 
         status: 'dnd' })  
     });

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);

});
// -- Login -- //
client.login(process.env.DISCORD_TOKEN);
// client.destroy();