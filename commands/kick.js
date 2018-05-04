const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    let kUser =  message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("I wasn't able to find the specified user. Please try again!");
    let kReason = args.join(' ').slice(22);
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Sorry, you do not have valid permissions to complete this action.');
    if(kUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Sorry, that user can't be kicked.");

    let embed = new Discord.RichEmbed()
        .setDescription('~Kick~')
        .setColor('#fff')
        .addField('Kicked User', `${kUser} with ID ${kUser.id}`)
        .addField('Kicked By', `<@${message.author.id}> with ID ${message.author.id}`)
        .addField('Kicked in', message.channel)
        .addField('Time', message.createdAt)
        .addField('Reason', kReason);

    let kickChannel = message.guild.channels.find(`name`, 'incidents');
    if(!kickChannel) return message.channel.send("Can't find the incidents channel!");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(embed);

    return;
}

module.exports.help = {
    name: 'kick'
}