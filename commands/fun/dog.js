const Discord = require('discord.js');
const request = require('superagent');

module.exports.run = async(bot, message, args) => {
    let [breed, breed2] = [args[0], args[1]];

    switch(true) {
        case args.length <= 0:
            request.get(`https://dog.ceo/api/breeds/image/random`)
            .then((res) => {
            let embed = new Discord.RichEmbed()
                .setColor('#607D8B')
                .setImage(res.body.message);
            message.channel.send(embed);
            message.delete().catch(() => {});
            })
            .catch((err) => {
                message.reply(`I was unable to load the picture due to the following error: '${err.message}'.`);
            });
            break;
        case args.length === 1:
            console.log(args);
            request.get(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then((res) => {
            let embed = new Discord.RichEmbed()
                .setColor('#607D8B')
                .setImage(res.body.message);
            message.channel.send(embed);
            })
            .catch((err) => {
                message.reply(`I was unable to load the picture due to the following error: '${err.message}'.`);
            });
            break;
        case args.length === 2:
            request.get(`https://dog.ceo/api/breed/${breed2}/${breed}/images/random`)
            .then((res) => {
            let embed = new Discord.RichEmbed()
                .setColor('#607D8B')
                .setImage(res.body.message);
            message.channel.send(embed);
            })
            .catch((err) => {
                message.reply(`I was unable to load the picture due to the following error: '${err.message}'.`);
            });
            break;
    }
}

module.exports.help = {
    name: 'dog'
}