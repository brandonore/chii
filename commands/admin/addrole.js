const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_MEMBERS')) message.reply("Sorry, you don't have the required permissions to complete this action.");
    let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rMember) return message.reply("I wasn't able to find the specified user. Please try again!");
    let role = args.join(' ').slice(22);
    if(!role) return message.reply('Please specify a role!');
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("I couldn't find the specified role. Please check to make sure it exists.");

    if(rMember.roles.has(gRole.id)) return message.reply('They already have that role!');
    await(rMember.addRole(gRole.id));

    try {
        await rMember.send(`You have been given the ${gRole.name} role. Yayy!~`);
    } catch(e) {
        message.channel.send(`Congrats to <@${rMember.id}>! They have been given the ${gRole.name} role. I tried to DM them, but their DMs are locked :(`);
    }
}

module.exports.help = {
    name: 'addrole'
}