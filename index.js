/*
Sparrow, the ordinary open source bot
*/
const Discord = require("discord.js");
const setTitle = require("node-bash-title")
const math = require("mathjs");
const config = require("./config.json")
const client = new Discord.Client();
const prefix = config.prefix;

setTitle('Sparrow Host Panel')
async function getUser(message) {
    let text = message.content.replace(/\r\n|\r|\n|\t|<|@|#|!|&|>/gi, " ");
    let r;
    let arr = text.split(" ");
    for (let i = 0; i < arr.length; i++) {
        const word = arr[i];
        if (Number(word) && word.length == 18) {
            r = await client.fetchUser(word);
        }
    }
    return r;
}

//on ready

client.on("ready", async () => {
    console.log(`${client.user.tag} is now online!`)
    client.user.setPresence({
        game: {
            name: 'websockets',
            type: 'LISTENING'
        },
        status: 'online'
    })
});

//message listener

client.on("message", async (message) => {
    if (message.author.bot && message.content.toLowerCase().startsWith(prefix)) return;
    let command = message.content.replace(prefix, "").toLowerCase();
    if (command.match(/\r\n|\r|\n|\t| /)) command = command.slice(0, command.match(/\r\n|\r|\n|\t| /).index);
    if (command == "ping") {
        message.reply({
            embed: {
                title: "Ping",
                color: 1,
                fields: [{
                    name: "Pong!",
                    value: (`${Math.floor(client.ping)} ms ping.`)
                }]
            }
        });
    } else if (command == "help") {
        message.reply({
            embed: {
                title: "Help",
                color: 1,
                fields: [{
                    name: "Commands",
                    value: (`🔷 Ping | Github/Source | Info | Invite 🔷`)
                }]
            }
        });

    } else if (command == "eval") {
        if (message.author.id === "398259331834839041") {
            let evalthis = message.content.split(`${prefix}eval `).join(" ")
            eval(evalthis)
        }
    } else if (command == "shutdown") {
        if (message.author.id === "398259331834839041") {
            client.destroy();
        }
    } else if (command == "info") {
        message.channel.startTyping();
        let user = await getUser(message);
        if (!user) {
            message.reply("Invalid user");
            return;
        }
        message.reply({
            embed: {
                color: 1,
                title: "Sparrow",
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

                    }
                ],
                timestamp: new Date(),
                thumbnail: user.avatarURL,
                value: "Task Complete"
            }
        })
        message.channel.stopTyping();
    } else if (command == "github" || command == "source") {
        message.reply("Sparrow's Github can be found here! https://github.com/darkvoid07/SparrowBot");
    } else if (command == "invite") {
        message.reply({
            embed: {
                title: "Invite",
                color: 1,
                fields: [{
                    name: "Invite Sparrow to your server!",
                    value: (`https://discordapp.com/api/oauth2/authorize?client_id=573503536885923861&permissions=313344&scope=bot`)
                }]
            }
        });

    }
});

client.login(config.token)
