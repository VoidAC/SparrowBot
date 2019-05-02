/*
ToastBot, the ordinary open source bot
*/

const Discord = require("discord.js");
const math = require("mathjs");
const config = require("./config.json")
const client = new Discord.Client();
const prefix = config.prefix;


async function getUser(message) {
	let text = message.content.replace(/\r\n|\r|\n|\t|<|@|#|!|&|>/gi, " ");
	let r;
	text.split(" ").forEach(word => {
		if (Number(word) && word.length == 18) {
			r = await client.fetchUser(word);
		}
	})
	return r;
}

//on ready

client.on("ready", async() => {
    console.log(`${client.user.tag} is now online!`)
    client.user.setActivity("Toasting bread")
});

//message listener

client.on("message", async(message) => {
    if (message.author.bot && message.content.toLowerCase().startsWith(prefix)) return;
    let command = message.content.replace(prefix, "").toLowerCase();
	if (command.match(/\r\n|\r|\n|\t| /)) command = command.slice(0, command.match(/\r\n|\r|\n|\t| /).index);
	if (command == "ping") {
		message.reply({
			embed: {
				title: "Ping",
				color: 12290084,
				fields: [{
					name: "Pong!",
					value: (`${Math.floor(client.ping)} ms ping.`)
				}]
			}
		});
	}
	else if (command == "info") {
		let user = await getUser(message);
		if (!user) {
			message.reply("Invalid user");
			return;
		}
		message.channel.startTyping();
		client.fetchUser(user).then((user) => {
			message.reply({
				embed: {
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

						}],
					timestamp: new Date(),
					thumbnail: user.avatarURL,
					value: "Toasted the bread!"
				}
			})
			message.channel.stopTyping();
		})
	}
    else if (command == "github" || command == "source") {
		message.reply("ToastBot's github can be found here! https://github.com/darkvoid07/ToastBot");
    }
});

client.login(config.token)
