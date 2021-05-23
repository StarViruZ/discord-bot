module.exports = {
    name: 'reactionrole',
    description: 'React to set a stupid role',
    execute(msg, args, Discord, client) {
        const rolesChannel = '846146613004206130';
        const english = msg.guild.roles.cache.find(role => role.name === 'English');
        const espanol = msg.guild.roles.cache.find(role => role.name === 'Español');
        const flagus = '🇺🇸';
        const flagmx = '🇲🇽';

        
    }
}