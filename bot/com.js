/*
	fs for FileSystem - nodejs
	request for some GET,SET (e.g images)
	cheerio reading the html page
	iconv-lite for html to plain
*/
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var iconv = require('iconv-lite');

function updateMessagebox() {
	require("fs").writeFile("./messagebox.json", JSON.stringify(messagebox, null, 2), null);
}

var commands = {
	"damn": {
		usage: "",
		description: "returns image/gif",
		cooldown: 10,
		process: function(clientBot, msg) {
			var rand = Math.floor((Math.random() * 2) + 1);
			var result;
			if (rand == 1) {
				result = 'https://i.imgur.com/7lZwLKc.jpg';
			} else {
				result = 'https://i.imgur.com/VQLGJOL.gif';
			}
			clientBot.sendMessage(msg.channel, result, function(err, msg){
				clientBot.deleteMessage(msg , {wait: 5000 * 2});
			});
		}
	},
	"happy": {
		usage: "",
		description: "returns image/gif",
		cooldown: 10,
		process: function(clientBot, msg) {
			var rand = Math.floor((Math.random() * 2) + 1);
			var result;
			if (rand == 1) {
				result = 'https://i.imgur.com/gbXzYXp.gif';
			} else {
				result = 'https://i.imgur.com/OxwIC0O.gif';
			}
			clientBot.sendMessage(msg.channel, result, function(err, msg){
				clientBot.deleteMessage(msg , {wait: 5000 * 2});
			});
		}
	},
	"sp": {
		usage: "",
		description: "Gives you some South Park quotes",
		cooldown: 10,
		process: function(clientBot, msg) {
			var sentences = [
			    "``Mom — kitty is being a dildo.`` — Cartman",
					"``There’s a time and a place for everything, and it’s called college.`` — Chef",
					"``Too bad drinking scotch isn’t a paying job or Kenny’s dad would be a millionare!`` — Cartman",
					"``It’s been six weeks since Saddam Hussein was killed by wild boars and the world is still glad to be rid of him.`` — Newscaster",
					"``I'm not fat, I'm big-boned.`` — Cartman",
					"``No, Jay Leno's chin is big-boned. You are a big fat ass.`` — Stan",
					"``Mmmmf mmmf mmmmmf mmmmmmm mmmmf mmmmf mmmmmmmmf mmmf.`` — Kenny",
					"``Why don't we all sing, \"Kyle's Mom is a Stupid Bitch\" in D-minor?`` — Cartman",
					"``TIMAH.`` — Timmy",
					"``You go to hell. You go to hell and you die.`` — Garrison",
					"``I don't want to do it if it hurts or if it makes you get all sticky.`` — Butters",
					"``Butters, remind me to cut your balls off later.`` — Cartman",
					"``WhatwhatWHAT?`` — Mrs. Broflovski",
					"``I'm so high man, I don't think I can take it.`` — Towelie",
					"``Cartman, that's the dumbest thing you've ever said... this week.`` — Kyle",
					"``Oh, Jesus Christ.`` — Mr.Slave",
					"``I got my period.`` — Eric Cartman"
			];
			var index= Math.floor(Math.random() * (sentences.length));
			clientBot.sendMessage(msg , sentences[index] );
		}
	},
	"db": {
		usage: "",
		description: "Gives you some Dragonball quotes",
		cooldown: 10,
		process: function(clientBot, msg) {
			var sentences = [
			    "``It's not a waste of time, if we're having fun.`` — Android 17",
					"``You'll laugh at your fears when you find out who you really are.`` — Piccolo training Gohan for the first time",
					"``Life is good, but living in fear is not my idea of living.`` — Android 16",
					"``Limitations only exist, if you let them!`` — Vegeta",
					"``Bulma! Your balls are gone!`` — Goku",
					"``You may have taken my mind and my body, but there is one thing a Saiyan always keeps! HIS PRIDE!!!`` — Vegeta",
					"``YEEEAAAAAH`` — Mr. Satan",
					"``There's only one certainty in life. A strong man stands above and conquers all!`` — Vegeta",
					"``Let me ask you. Does a machine like yourself ever experience fear. `` — Vegeta",
					"``It looks like they only want me, and that's exactly who they'll get.`` — Goku",
					"``Trunks, I never hugged you as a baby... let me hug you.`` — Vegeta",
					"``I'll do it slowly, so you can watch me better.`` — Gohan",
					"``Kaio-Ken! Times Ten!`` — Goku",
					"``Sorry, I saw an opening that just screamed 'ATTACK,' so I did, ha!`` — Goku",
					"``Eternal Dragon, by your name, I summon you forth, Shenron.`` — Dende",
					"`` We can't give up just because things aren't the way we want them to be.`` — Piccolo",
					"``Let's see what you got Kakarot. Galic Gun Fire!`` — Vegeta",
					"``I have yet to show you, young warrior, what I'm truly capable of.`` — Cell",
					"``What went wrong? You had me! `` — Vegeta",
					"``~evil laugh~... And then there was one...`` — Vegeta",
					"``I am the prince of all Saiyans once again!`` — Vegeta",
					"``As long as I have the power to destroy you Cell, I'm willing to sacrifice everything.`` — Trunks",
					"``I can go one step farther if I wanted to.`` — Goku",
					"``Strength is the only thing that means anything to me!`` — Vegeta",
					"``Piccolo! You big jerk! I take back all the nice things I said about you!`` — Gohan",
					"``Your real strength is your bravery.`` — Pan",
					"``Now that we have the vermin out of the way. You're next Piccolo. `` — Cell",
					"``Is uh, # 18 your real name? `` — Tournament Announcer",
					"``Buu turn you into candy. `` — Majin Buu",
					"``Hey! Don't piss off the god of love! `` — Dende"
			];
			var index= Math.floor(Math.random() * (sentences.length));
			clientBot.sendMessage(msg , sentences[index] );
		}
	},
	"r": {
		usage: "",
		description: "Gives you random quotes",
		cooldown: 10,
		process: function(clientBot, msg) {
			var sentences = [
			    "``BÖÖÖSES IST IM BUSCH!!! DAS BÖÖÖÖÖÖÖSEEEEE!`` — Meerjungfraumann",
				"``I love Pandas.`` :panda_face:  — Devsome",
				"`BÖSES IST IM BUSCH!` —  Meerjungfraumann",
				"`Klaus, Klaus, Klaus!` —  Spongebob",
				"`Well it may be stupid but it's also dumb!` —  Patrick",
				"`Well, it’s no secret that the best thing about a secret is secretly telling someone your secret, thereby adding another secret to their secret collection of secrets, secretly` —  Spongebob"
			];
			var index= Math.floor(Math.random() * (sentences.length));
			clientBot.sendMessage(msg , sentences[index] );
		}
	},
	"ping": {
		usage: "",
		description: "Checking the reaction from the bot",
		cooldown: 15,
		process: function(clientBot, msg) {
			if(msg.author.game){
				clientBot.sendMessage(msg.channel, "Why not playing ``" + msg.author.game.name + "`` :rolling_eyes: " , (e,sentMsg) => {
						clientBot.updateMessage(sentMsg, "Why not playing ``" + msg.author.game.name + "`` :rolling_eyes: " + "\t(" + (sentMsg.timestamp - msg.timestamp) + " ms)");
				});
			}else{
				clientBot.sendMessage(msg.channel, "pong!" , (e,sentMsg) => {
						clientBot.updateMessage(sentMsg, "pong!!" + "\t(" + (sentMsg.timestamp - msg.timestamp) + " ms)");
				});
			}
		}
	},
	"emma": {
		usage: "",
		description: "Loads some random Emma Watson images :hearts: ",
		cooldown: 5,
		process: function(clientBot, msg) {
			let file = getAsset("emma", "*");
			clientBot.sendFile( msg.channel, file, file, (err, msg) => {
				if (err) {
					clientBot.sendMessage(msg.channel, "I do not have the rights to send a **file** :cry:!");
				}
			});
		}
	},
	"jlaw": {
		usage: "",
		description: "Loads some random Jennifer Lawrence images :hearts: ",
		cooldown: 5,
		process: function(clientBot, msg) {
			let file = getAsset("jlaw", "*");
			clientBot.sendFile( msg.channel, file, file, (err, msg) => {
				if (err) {
					clientBot.sendMessage(msg.channel, "I do not have the rights to send a **file** :cry:!");
				}
			});
		}
	},
	"fortune": {
		usage: "",
		description: "gives you a fortune",
		cooldown: 5,
		process: function(clientBot, msg) {
			request
				.get( "http://yerkee.com/api/fortune" , function (err, res) {
					clientBot.deleteMessage(msg, {wait: 2000});
					if (err === null || typeof err === typeof undefined) {
						var obj = JSON.parse(res.body);
						clientBot.sendMessage(msg.channel, "``" + obj['fortune'] + "``", function(err, msg){
							clientBot.deleteMessage(msg , {wait: 5000 * 3});
						});
					} else {
						clientBot.sendMessage(msg.channel, "``Error by getting one fortune, but you are beautiful :3``", function(err, msg){
							// clientBot.deleteMessage(msg , {wait: 5000 * 3});
						});
					}
				})
				.on('response', function(response) {
					// console.log(response.statusCode) // 200
					// console.log(response.headers['content-type']) // 'image/png'
			  })
				.on('error', function(err) {
					// console.log(err)
				})
		}
	},
	"coinflip" :{
		usage: "<red or black>",
		description: "Black or Red to coinflip.",
		cooldown: 5,
		process: function(clientBot, msg, suffix) {
			var suffix = suffix.toLowerCase();
			if(suffix === "black" || suffix === "red") {
				if (suffix) {
					var rand = Math.floor((Math.random() * 2) + 1);
					if (rand == 1) {
						var col = "black";
					} else {
						var col = "red";
					}
					if (suffix === col) {
						clientBot.sendMessage(msg, msg.author.username.replace(/@/g, '@\u200b') + " said :" + suffix + "_circle: and won this round ! :tada: :moneybag:" );
					} else {
						clientBot.sendMessage(msg, msg.author.username.replace(/@/g, '@\u200b') + " said :" + suffix + "_circle: You lost this round :cry:" );
					}
				} else {
					clientBot.sendMessage(msg.channel, "Please use a <suffix> ``~confip red or black`` :point_up:", function(err, msg){
						clientBot.deleteMessage(msg , {wait: 5000 * 1});
					});
				}
			} else {
				clientBot.sendMessage(msg.channel, "Please use a <suffix> ``~confip red or black`` :point_up:", function(err, msg){
					clientBot.deleteMessage(msg , {wait: 5000 * 1});
				});
			}
		}
	},
	"reverse": {
		usage: "<text>",
		description: "Displaying the text backwards",
		cooldown: 5,
		process: function(clientBot, msg, suffix) {
			clientBot.deleteMessage(msg);
			if (suffix) {
				clientBot.sendMessage(msg, "\u202e " + suffix);
			} else {
				clientBot.sendMessage(msg.channel, "Please use a <suffix> ``~reverse My text`` :point_up:", function(err, msg){
					// clientBot.deleteMessage(msg , {wait: 5000 * 1});
				});
			}
		}
	},
};

exports.commands = commands;
