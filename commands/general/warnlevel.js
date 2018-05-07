const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.reply("I wasn't able to find the specified user. Please try again!");
    if(!warns[wUser.id]) {
        return message.reply(`<@${wUser.id}> has 0 warnings.`);
    } else {
        let warnLvl = warns[wUser.id].warns;
        return message.reply(`<@${wUser.id}> has ${warnLvl} warnings.`);
    }
}

module.exports.help = {
    name: 'warnlevel'
}