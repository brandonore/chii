const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    let servericon = message.guild.iconURL;
    let embed = new Discord.RichEmbed()
        .setDescription('Server Information')
        .setColor('#cc00ff')
        .setThumbnail(servericon)
        .addField('Server name', message.guild.name)
        .addField('Created On', message.guild.createdAt)
        .addField('You Joined', message.member.joinedAt)
        .addField('Total Members', message.guild.memberCount);

        return message.channel.send(embed);
}

module.exports.help = {
    name: 'serverinfo'
}