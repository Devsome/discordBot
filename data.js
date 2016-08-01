/*
	Discord for Discord settings, makes sense huh?!
	Created by Alexander Frank
	thanks to some mates who helpd me :3

*/
var Discord = require("discord.js");



// Loading my Configs
var config = require("./bot/config.json");
var games = require("./bot/games.json");
var commands = require("./bot/com.js");

var clientBot = new Discord.Client();

var joinUrl = "https://discordapp.com/oauth2/authorize?client_id=" + config.app_id + "&scope=bot&permissions=";

var lastExecTime = {},
		pmCoolDown = {};
setInterval( () => { lastExecTime = {};pmCoolDown = {} },3600000 ); // 3600 sekunden => 60 minuten

clientBot.on("ready", function () {
	console.log("\n[INFO]\tTo add me visit this url:\n\t" + joinUrl + "\n\n");
	console.log("[INFO]\tReady to begin!");
	console.log("[INFO]\tYou're connected to [ " + clientBot.servers.length + " ] Servers with [" + clientBot.channels.length + "] Channels!");

	clientBot.setPlayingGame( games[Math.floor(Math.random() * (games.length))] );
	//clientBot.setAvatar("data:image/jpeg;base64,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");
});

clientBot.on('disconnected', function() {
	console.log("Disconnted ? Let me reconnect asap...");
	commandsProcessed = 0;
	lastExecTime = {};
	clientBot.loginWithToken(config.token);
});

clientBot.on("error", function (error) {
	console.log("Caught error: " + error);
});

clientBot.on("presence", function(user, state, gameId) {
	try{
		if(state.status != 'offline') {
			if( messagebox.hasOwnProperty(state.id)) {
				console.log("found msg for " + state.id);
				var message = messagebox[state.id];
				var channel = clientBot.channels.get("id", message.channel);
				delete messagebox[state.id];
				updateMessagebox();
				clientBot.sendMessage(channel, message.content);
			}
		}
	}catch(e){}
});

// STRG+C in Terminal
process.on("SIGINT", function () {
    console.log("\n Whoa wait, let me logout first...");
	clientBot.logout();
	process.exit(1);
});

try {
	messagebox = require("./bot/messagebox.json");
} catch(e) {
	messagebox = {};
}




clientBot.on("message", function (msg) {

	// anti-table-flip
	if(config.antitable) {
		if(msg.content.indexOf( "┻" ) >= 0 ) {
			if (!lastExecTime.hasOwnProperty('tableflip')) lastExecTime['tableflip'] = {};
			if (!lastExecTime['tableflip'].hasOwnProperty(msg.author.id)) lastExecTime['tableflip'][msg.author.id] = new Date().valueOf();
			else {
				// clientBot.deleteMessage(msg);
				var now = Date.now();
				if (now < lastExecTime['tableflip'][msg.author.id] + (10 * 1000)) {
					clientBot.deleteMessage(msg);
					clientBot.sendMessage(msg, msg.author.username.replace(/@/g, '@\u200b') + ", we don't have so many tables, please wait (" + Math.round(((lastExecTime['tableflip'][msg.author.id] + 10 * 1000) - now) / 1000) + " seconds)", function(err,msg){
						clientBot.deleteMessage(msg , {wait: 5000});
					});
					if (!msg.channel.isPrivate) clientBot.deleteMessage(msg, {"wait": 5000});
					return;
				} lastExecTime['tableflip'][msg.author.id] = now;
			}

			/*
			clientBot.sendMessage(msg.channel, "┬─┬﻿ ノ( ゜-゜ノ) :robot: Cleaning...", function(err,msg){
				clientBot.deleteMessage(msg , {wait: 5000});
			});*/
		}
	}
	
	if(config.kappa) {
		if(msg.content.toLowerCase().indexOf( "kappa" ) >= 0 ) {
			let emote = getAsset("emotes", "kappa.png");
			clientBot.sendFile(msg.channel, emote, emote, (err, msg) => {
				if (err) {
					clientBot.sendMessage(msg.channel, "I do not have the rights to send a **file** :cry:!");
				}
			});
		}
	}
	
	if(config.fbm) {
		if(msg.content.toLowerCase().indexOf( "feelsbadman" ) >= 0 ) {
			let emote = getAsset("emotes", "feelsbad.png");
			clientBot.sendFile(msg.channel, emote, emote, (err, msg) => {
				if (err) {
					clientBot.sendMessage(msg.channel, "I do not have the rights to send a **file** :cry:!");
				}
			});
		}
	}
	
	if(config.fbm) {
		if(msg.content.toLowerCase().indexOf( "john cena" ) >= 0 ) {
			let emote = getAsset("emotes", "cena.gif");
			clientBot.sendFile(msg.channel, emote, emote, (err, msg) => {
				if (err) {
					clientBot.sendMessage(msg.channel, "I do not have the rights to send a **file** :cry:!");
				}
			});
		}
	}
	
	if(msg.author.id != clientBot.user.id && msg.content[0] === '~'){
		var cmdTxt = msg.content.split(" ")[0].substring(1);
		var suffix = msg.content.substring(cmdTxt.length+2);
		var cmd = commands.commands[cmdTxt];

		if (!lastExecTime.hasOwnProperty(cmd)) lastExecTime[cmd] = {};
		if (!lastExecTime[cmd].hasOwnProperty(msg.author.id)) lastExecTime[cmd][msg.author.id] = new Date().valueOf();
		else {
			var now = Date.now();
			if( cmd ) {
				if( typeof cmd.cooldown === "undefined" ) { cmd.cooldown = 10; }
				if (now < lastExecTime[cmd][msg.author.id] + (cmd.cooldown * 1000)) {
					clientBot.sendMessage(msg, msg.author.username.replace(/@/g, '@\u200b') + ", :ice_cream: *cooldown*, please wait (" + Math.round(((lastExecTime[cmd][msg.author.id] + cmd.cooldown * 1000) - now) / 1000) + " seconds)", function(err,msg){
						clientBot.deleteMessage(msg , {wait: 5000});
					});
					if (!msg.channel.isPrivate) clientBot.deleteMessage(msg, {"wait": 5000});
					return;
				} lastExecTime[cmd][msg.author.id] = now;
			}
		}

		if(cmdTxt === "h"){
			var info = "The real one :robot: from South Park.\nCommands you can use: \n```glsl\n";
			for(var cmd in commands.commands) {
				var usage = commands.commands[cmd].usage;
				var description = commands.commands[cmd].description;
				info += "~" + cmd + " " + usage;
				if(description){
					info += "\n\t#" + description + "\n";
				}
			}
			info += "```\tCreated with :heart: by\n\t\t**Devsome**";
			clientBot.sendMessage(msg.author,info);
		} else if(cmd) {
			try{
				cmd.process(clientBot,msg,suffix);
			} catch(e) {
				clientBot.sendMessage(msg.channel, "Command ``" + cmdTxt + "`` failed :cry: \n" + e);
			}
		} else { // If the ! command was not found
		// clientBot.sendMessage(msg.channel, "Invalid command " + cmdTxt);
		}
	} else if (msg.author != clientBot.user && msg.isMentioned(clientBot.user)) { // If someone @called the Bot
		clientBot.sendMessage(msg.channel,msg.author + ", you called? Type `~h` for help");
	}
});





/* TOKEN */
clientBot.loginWithToken(config.token, (err, token) => {
	if (err) { console.log(err); setTimeout(() => { process.exit(1); }, 2000); }
	if (!token) { console.log(" WARN " + " failed to connect"); setTimeout(() => { process.exit(0); }, 2000); }
});

/* Changing game playing */
setInterval(() => {
	clientBot.setPlayingGame(games[Math.floor(Math.random() * (games.length))]);
}, (10 * 1000) * 60); //change playing game every 10 minutes

global.getAsset = (prefix, file) => {
	const fs = require("fs");

	let path = `${__dirname}/assets/${prefix}/`;

	try {
		if(file == "*") {
			let dir = fs.readdirSync(path);
			let choice = Math.floor(Math.random() * dir.length);
			return dir[choice];
		} else {
			fs.statSync(path + file);
			return path + file;
		}
	} catch(e) {
		return false;
	}
};
