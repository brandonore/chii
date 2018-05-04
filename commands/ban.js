const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    let bUser =  message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("I wasn't able to find the specified user. Please try again!");
    let bReason = args.join(' ').slice(22);
    if(!message.member.hasPermission('MANAGE_MEMBERS')) return message.channel.send('Sorry, you do not have valid permissions to complete this action.');
    if(bUser.hasPermission('MANAGE_MEMBERS')) return message.channel.send("Sorry, that user can't be banned.");

    let embed = new Discord.RichEmbed()
        .setDescription('~Ban~')
        .setColor('#fff')
        .addField('Banned User', `${bUser} with ID ${bUser.id}`)
        .addField('Banned By', `<@${message.author.id}> with ID ${message.author.id}`)
        .addField('Banned in', message.channel)
        .addField('Time', message.createdAt)
        .addField('Reason', bReason);

    let banChannel = message.guild.channels.find(`name`, 'incidents');
    if(!banChannel) return message.channel.send("Can't find the incidents channel!");

    message.guild.member(bUser).ban(bReason);
    banChannel.send(embed);
}

module.exports.help = {
    name: 'ban'
}