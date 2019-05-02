/*
ToastBot, the ordinary open source bot
*/
//Declare all requires and make bot object
const Discord = require("discord.js");
const math = require("mathjs");
const config = require("./config.json")
const client = new Discord.Client();


//ready


client.on("ready", async () => {
    console.log(`${client.user.username} is now online!`)
    client.user.setActivity("Toasting bread")
});


client.on("message", async message => {
    if (message.author.bot) return;
    prefix = config.prefix;
    command = message.content;
    //start of commands


    if (command === (prefix + "ping")) {
        message.reply({

            embed: ({
                title: "Ping",
                color: "#b5651d",
                fields: [{

                    name: (`${Math.floor(client.ping)} ms ping.`),


                }],
            })
        })
    }
    if (command === (prefix + "info")) {
        let user = message.content.split(prefix + "info ").join();

        client.fetchUser(user).then((user) => {

            setTimeout(function() {
                message.channel.startTyping();
                message.reply({
                    color: 353231,
                    title: "USS Milwaukee",
                    description: `Bot Information`,
                    fields: [{
                            name: "Username",
                            value: `${user.username}`
                        },

                        {
                            name: "Tag",
                            value: `${user.tag}`
                        },

                        {
                            name: "ID",
                            value: `${user.id}`
                        },
                        {
                            name: "Avatar",
                            value: `${user.avatarURL}`

                        },


                    ],
                    timestamp: new Date(),
                    value: "Toasted the bread!"
                })
                message.channel.stopTyping();
            }, 2000)
        })
    }


});

client.login(config.token)