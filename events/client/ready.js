// const Discord = require('discord.js');
// const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
// const memberCounter = require('../../counters/member-counter');
// client.commands = new Discord.Collection();

module.exports = (client, msg, Discord) => {
    console.log('Your mom is alive');
    // memberCounter(client);
    
    // This should be running right away to keep the reaction roles working
    // Also the embed code should be commented to prevent unnecesary spam
    // client.commands.get('reactionrole').execute(null, Discord, client);

    // client.user.setPresence({ 
    //     activity: { 
    //         name: 'you as my bitch' }, 
    //     status: 'idle' 
    // });

};