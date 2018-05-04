const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_MEMBERS')) message.reply("Sorry, you don't have the required permissions to complete this action.");
    let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rMember) return message.reply("I wasn't able to find the specified user. Please try again!");
    let role = args.join(' ').slice(22);
    if(!role) return message.reply('Please specify a role!');
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("I couldn't find the specified role. Please check to make sure it exists.");

    if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role!");
    await(rMember.removeRole(gRole.id));

    try {
        await rMember.send(`I'm sorry, the ${gRole.name} role has been removed :(`);
    } catch(e) {
        message.channel.send(`I have removed the ${gRole.name} from <@${rMember.id}>. I tried to DM them, but their DMs are locked :(`);
    }
}

module.exports.help = {
    name: 'removerole'
}