const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_MEMBERS')) return message.reply("Sorry, you don't have the required permissions to complete this action.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.reply("I wasn't able to find the specified user. Please try again!")
    if(wUser.hasPermission('MANAGE_MESSAGES')) return message.reply('You cannot warn a user with a higher or equal role to you!');
    let reason = args.join(' ').slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    }

    warns[wUser.id].warns++;

    fs.writeFile('./warnings.json', JSON.stringify(warns), (err) => {
        if(err) console.log(err);
    });

    let embed = new Discord.RichEmbed()
        .setDescription('Warns')
        .setAuthor(message.author.username)
        .setColor('#EEFF41')
        .addField('Warned User', `<@${wUser.id}>`)
        .addField('Warned In', message.channel)
        .addField('Number of Warnings', warns[wUser.id].warns)
        .addField('Reason', reason);

    let warnChannel = message.guild.channels.find(`name`, 'reports');
    if(!warnChannel) return message.reply("I can't fine the required channel!");

    warnChannel.send(embed);

    if(warns[wUser.id].warns === 2) {
        console.log(warns[wUser.id].warns);
        let muteRole = message.guild.roles.find(`name`, 'Chii Muted');
        if(!muteRole) return message.reply(`The role does not exist! Please create it.`);

        let muteTime = '10s';
        console.log(muteTime);
        await(wUser.addRole(muteRole.id));
        message.reply(`<@${wUser.id}> has been temporarily muted.`);

        setTimeout(() => {
            wUser.removeRole(muteRole.id);
            message.channel.send(`<@${wUser.id}> has been unmuted.`);
        }, ms(muteTime));
    }
}

module.exports.help = {
    name: 'warn'
}