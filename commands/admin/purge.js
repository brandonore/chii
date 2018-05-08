const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
    // get num of msgs to delete
    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply('Please provide a number between 2 and 100 for the number of messages to delete.');
    // fetch previous messages
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`I wasn't able to delete the messages due to the following error: '${error}'`));
}

module.exports.help = {
    name: 'purge'
}