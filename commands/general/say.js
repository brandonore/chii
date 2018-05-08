const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    // combine args for msg to say
    const msg = args.join(' ');
    // delete command and send msg
    message.delete().catch(o_o => {});
    message.channel.send(msg);
}

module.exports.help = {
    name: 'say'
}