const { RichEmbed } = require("discord.js");

module.exports = {
    name: "say",
    description: "idfk?",
    execute(client, msg, args, PREFIX,ownerRole,embedColor) {
        if (msg.content.startsWith(PREFIX)) {
            switch (args[0]) {
                case "say":
                    if (msg.member.roles.has(ownerRole)) {
                        const sayEmbed = new RichEmbed()
                            .setColor(embedColor)
                            .setTitle("Monopoly Verification!")
                            .setDescription(args.slice(1).join(" "))
                            .setTimestamp()
                            .setFooter("Monopoly", "https://cdn.discordapp.com/avatars/684534977056079876/9dad3104188f709a2040eaa6bdb43533.png?size=128");

                        console.log("sent the say embed with this message " + '"' + args.slice(1).join(" ") + '"');
                        msg.delete(10);
                        return msg.channel.send(sayEmbed)
                        // .then(msg =>{
                        //     msg.react("tick:684519798696050936");
                        // });
                    } else {
                        msg.reply("```cs\n#No Permission!```").then(msg => {
                            msg.delete(2500);
                        });
                        msg.delete(10);
                        return console.log("returned no Perms for !say " + msg.member.user.tag);
                    }
            }
        } else return;

    }
};