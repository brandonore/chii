const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    let botIcon = bot.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
        .setDescription('About Chii')
        .setColor('#cc00ff')
        .setThumbnail(botIcon)
        .addField('Name', bot.user.username)
        .addField('Created On', bot.user.createdAt);

    return message.channel.send(embed);
}

module.exports.help = {
    name: 'botinfo'
}