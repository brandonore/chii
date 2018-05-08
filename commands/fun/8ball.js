const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    // check if question is more than one word/argument
    if(!args[2]) return message.reply('Please ask a full question!');

    // the 20 answers for a standard magic 8-ball
    const replies = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes, definitely',
                    'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good',
                    'Yes', 'Signs point to yes', 'Reply hazy try again', 'Ask again later',
                    'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again',
                    "Don't count on it", 'My reply is no', 'My sources say no', 'Outlook not so good',
                    'Very doubtful'];
    const result = Math.floor(Math.random() * replies.length);
    const question = args.slice(0).join(' ');

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor('#212121')
        .addField('Question', question)
        .addField('Answer', replies[result]);
        message.channel.send(embed);
}

module.exports.help = {
    name: '8ball'
}