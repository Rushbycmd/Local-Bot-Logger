const Discord = require("discord.js");
const fs = require("fs");

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
let usedIds = new Set();

client.on("messageCreate", (message) => {
  // Don't count messages from bots.
  if (message.author.bot) return;


  // Generate a random ID for the message.
  let messageId;
  do {
    messageId = `${message.channel.id}|${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  } while (usedIds.has(messageId));
  usedIds.add(messageId);

  // Create a message object with the specified keys.
  const messageObject = {
    [messageId]: {
      "Timestamps": [message.createdAt.toISOString()],
      "Guild Name": [message.guild.name],
      "Guild ID": [message.guild.id],
      "Channel Name": [message.channel.name],
      "channel ID": [message.channel.id],
      "Author ID": [message.author.id],
      "Author Username": [message.author.username],
      "Message Content": [message.content],
    },
  };

  // Check if the "channel" folder exists.
  if (!fs.existsSync("channel")) {
    // If the folder doesn't exist, create it.
    fs.mkdirSync("channel");
  }

  // Check if the JSON file exists.
  if (!fs.existsSync(`channel/${message.channel.id}.json`)) {
    // If the file doesn't exist, create it and write the message object to it.
    fs.writeFile(`channel/${message.channel.id}.json`, JSON.stringify(messageObject, null, 2), (error) => {
      if (error) {
        console.error(error);
      }
    });
  } else {
    // If the file exists, read the contents of the file.
    fs.readFile(`channel/${message.channel.id}.json`, "utf8", (error, data) => {
      if (error) {
        console.error(error);
        return;
      }

      // Parse the contents of the file as JSON.
      let fileContents;
      try {
        fileContents = JSON.parse(data);
      } catch (error) {
        console.error(error);
        return;
      }

      // Add the message object to the file contents.
      fileContents = { ...fileContents, ...messageObject };

      // Write the modified file contents to the JSON file.
      fs.writeFile(`channel/${message.channel.id}.json`, JSON.stringify(fileContents, null, 2), (error) => {
        if (error) {
          console.error(error);
        }
      });
    });
  }
}); 

const token = process.env.VARIABLE_NAME;
client.login(token);
client.on("ready", () => {
  console.log(`Channel Log online!`);
});