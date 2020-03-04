// Defining the Token from .env
require('dotenv').config();
const token = process.env.TOKEN;

const { Client, RichEmbed, Collection } = require('discord.js');
var client = new Client();
const fs = require('fs');
client.commands = new Collection();
const config = require("./config.json");

// Command Handler
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
// const aCommandFiles = fs.readdirSync('./commands/admin/').filter(file => file.endsWith('.js'));
// const gCommandFiles = fs.readdirSync('./commands/general/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

// loading the files 
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
    console.log("Loaded Command " + `${file}` + " Successfully");
}
// for (const file of aCommandFiles) {
//     const aCommand = require(`./commands/admin/${file}`);

//     client.commands.set(aCommand.name, aCommand);
//     console.log("Loaded Admin Command " + `${file}` + " Successfully");
// }
// for (const file of gCommandFiles) {
//     const gCommand = require(`./commands/general/${file}`);

//     client.commands.set(gCommand.name, gCommand);
//     console.log("Loaded Command " + `${file}` + " Successfully");
// }
for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    client.commands.set(event.name, event);
    console.log("Loaded Event " + `${file}` + " Successfully");
}



//prefixes 
const PREFIX = '!';
const POLLPRE = 'p!';
const ROLEPRE = 'r!';
const ADMINPRE = 'a!';

//variables 
var ownerRole = '684507933664346127';
var statusOnline = "```css\nBot status: \n#ONLINE```";
var logChannelID = "684526290988171360";
var embedColor = '#1224b0';
// var embedColor = '#0a0dc2';
var anncRole = '<@&655979998968152085>';
var srvIP = "play.parkmc.network";
var strIP = "http://store.parkmc.network/";
var webLink = "#Coming soon!...";
var frmLink = "#Coming soon!...";
var srvVer = "ParkMC supports from version 1.8.9 to 1.16";
var rulelnk = "https://docs.google.com/document/d/1l60HjpiphcgWW1eDtupRH_7KToj8MGo4bs6aoOFXx6w/edit?usp=sharing";
var verifyMsgID = '684546243577511989';
var guildID = '684505754216038438';



//###############################################################################################################################################
//on ready
client.on("ready", async rdyonline => {

    console.log("Bot ONLINE");
    client.user.setActivity("Kevin Code", { type: 'WATCHING' });
    client.channels.get(logChannelID).send(statusOnline);
});
//###############################################################################################################################################

client.on("message", async amsg => {
    // react to 
    if (amsg.channel.id == logChannelID) {
        try {
            await amsg.react("👍")
        }
        finally {
            // console.log("reacted to Status Message")
        }
    };
});

//###############################################################################################################################################

client.on('raw', payload => {
    if (payload.t === 'MESSAGE_REACTION_ADD') {
        //debug console.log("user reacted ")
        if ((payload.d.emoji.id != '684519798696050936')) {
            console.log("user reacted with not compatible emoji- returning");
            return;
        } else {

            if (payload.d.message_id === verifyMsgID) {
                let channel = client.channels.get(payload.d.channel_id)
                if (channel.messages.has(payload.d.message_id)) {
                    return;
                }
                else {
                    channel.fetchMessage(payload.d.message_id)
                        .then(msg => {
                            let MessageReaction = msg.reactions.get('tick:684519798696050936');

                            let user = client.users.get(payload.d.user_id);

                            client.emit('messageReactionAdd', MessageReaction, user);
                        })
                        .catch(err => console.log(err));
                }
            }
        }
    }
});

//###############################################################################################################################################

//Role add on reaction 
client.on('messageReactionAdd', (MessageReaction, user) => {

    var role = MessageReaction.message.guild.roles.find(role => role.id == '684521022153949221');
    var member = MessageReaction.message.guild.members.find(member => member.id === user.id);

    if (MessageReaction.message.id == verifyMsgID) {
        if (role) {
            if (user.id != "660760073546760204") {
                if (member) {
                    member.addRole(role.id).then(MessageReaction.remove())
                    console.log("gave role Member to " + user.username + " " + user.id);
                }
            }
        }
    }
});

//###############################################################################################################################################

//say command 
client.on('message', msg => {

    let args = msg.content.substring(PREFIX.length).split(" ");
    client.commands.get('say').execute(client, msg, args, PREFIX, ownerRole, embedColor);
});

//###############################################################################################################################################













//Message Event
client.on('message', async message => {
    //args
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //commands
    if (command === 'apply') {

        //Has to be in DMs
        if (message.channel.type != 'dm') {
            message.channel.send('Use this command in DMs!');
            return;
        }
        // if (msg.author.bot) { return };

        message.author.send('Application started!');

        //First Question
        await message.author.send(config.question1);
        const answer1 = await message.channel.awaitMessages(answer => answer.author.id != client.user.id, { max: 1 });
        const age = (answer1.map(answers => answers.content).join());
        console.log(config.question1 + " " + age);

        //Second Question
        await message.author.send(config.question2);
        const answer2 = await message.channel.awaitMessages(answer => answer.author.id != client.user.id, { max: 1 });
        const name = (answer2.map(answers => answers.content).join());
        console.log(config.question2 + " " + name);

        //Third Question
        await message.author.send(config.question3);
        const answer3 = await message.channel.awaitMessages(answer => answer.author.id != client.user.id, { max: 1 });
        const location = (answer3.map(answers => answers.content).join());
        console.log(config.question3 + " " + location);

        await message.author.send("WHERE DO YOU LIVE!");
        
        
        //Embed
        const applyEmbed = new RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField('Age', age)
        .addField('Name', name)
        .addField('Location', location)
        .setColor(embedColor)
        .setTimestamp()
        .setFooter("Monopoly", "https://cdn.discordapp.com/avatars/684534977056079876/9dad3104188f709a2040eaa6bdb43533.png?size=128");
        
        //Sending Embed
        const guild = client.guilds.get(guildID);
        await guild.channels.find(channel => channel.id === '684526316531613901').send(applyEmbed);
    }
});










client.login(token);