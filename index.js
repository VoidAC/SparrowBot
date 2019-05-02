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

//bot listener
client.on("message", async message => {
    if (message.author.bot) return;
    prefix = config.prefix;
    command = message.content;
    //start of commands


    if (command === (prefix + "ping")) {
        message.reply({

            embed: ({
                title: "Ping",
                color: 12290084,
                fields: [{

                    name: "Pong!",
                    value: (`${Math.floor(client.ping)} ms ping.`)


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
                    color: 12290084,
                    title: "ToastBot",
                    description: `Information`,
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
    if (command === (prefix + "github")) {
        if (message.member == message.guild.me) return;
    message.reply("ToastBot's github can be found here! https://github.com/darkvoid07/ToastBot")
    }
    if (command === (prefix + "source")) {
        if (message.member == message.guild.me) return;
    message.reply("ToastBot's source can be found here! https://github.com/darkvoid07/ToastBot")
    }


});

client.login(config.token)
