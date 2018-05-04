const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const dir = require('node-dir');

// assign new discord client to bot const
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

// command handler, search directories recursively and set commands to discord collection
const loadCommands = async() => {
    const folders = await readdir('./commands/');
    for(let i = 0; i < folders.length; i++) {
        let folder = folders[i];
        let files = await readdir(`./commands/${folder}/`);
        for(let x = 0; x < files.length; x++) {
            let file = files[x];
            let props = require(`./commands/${folder}/${file}`);
            if(!props) return;
            if(!props.help.name) props.help.name = file.split('.')[1];
            bot.commands.set(props.help.name, props);
            console.log(`Command loaded: ${props.help.name}`);
        }
    }
}

// start/ready bot
bot.on('ready', async() => {
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity('Anime', { type: 'WATCHING' });
});

// listen for messages from any channel
bot.on('message', async(message) => {
    // ignore other bots and dm channels
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    // setup command prefix and args based off message content
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandFile = bot.commands.get(cmd.slice(prefix.length));

    if(commandFile) commandFile.run(bot, message, args);
});

bot.login(botconfig.token);
loadCommands();