const Discord = require('discord.js');
const request = require('superagent');

module.exports.run = async(bot, message, args) => {
    request.get(`http://aws.random.cat/meow`)
    .then((res) => {
        let embed = new Discord.RichEmbed()
            .setColor('#607D8B')
            .setImage(res.body.file);
        message.channel.send(embed);
        message.delete().catch(() => {});
    })
    .catch((err) => {
        message.reply(`I was unable to load the picture due to the following error: '${err.message}'.`);
    });
}

module.exports.help = {
    name: 'cat'
}