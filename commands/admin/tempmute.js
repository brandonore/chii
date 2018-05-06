const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async(bot, message, args) => {
    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!toMute) return message.reply("Couldn't find the specified user");
    if(toMute.hasPermission('MANAGE_MESSAGES')) return message.reply('You cannot mute a user with a higher or equal role to you!');
    let muteRole = message.guild.roles.find(`name`, 'Muted');
    // start createRole
    if(!muteRole) {
        try {
            muteRole = await message.guild.createRole({
                name: 'Muted',
                color: '#F50057',
                permissions: []
            });
            message.guild.channels.forEach(async(channel, id) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }
    // end createRole
    let muteTime = args[1];
    if(!muteTime) message.reply("You didn't specify a time!");

    await(toMute.addRole(muteRole.id));
    message.reply(`<@${toMute.id}> has been muted for ${ms(ms(muteTime))}`);

    setTimeout(() => {
        toMute.removeRole(muteRole.id);
        message.channel.send(`<@${toMute.id}> has been unmuted`);
    }, ms(muteTime));
}

module.exports.help = {
    name: 'tempmute'
}