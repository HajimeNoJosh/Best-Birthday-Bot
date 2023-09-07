// Initialize dotenv
require('dotenv').config();
const cron = require('node-cron');
const { Client, GatewayIntentBits } = require('discord.js');
const { setupCommands } = require('./commands');
const { checkAndSendBirthdayMessages } = require('./birthday');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
});

// Set the bot's prefix
const prefix = '!';
// Set up bot commands
setupCommands(client, prefix);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Schedule the daily birthday check
    cron.schedule('0 0 * * *', () => {
        checkAndSendBirthdayMessages(client);
    });
});

// Log in to the bot using your token
client.login(process.env.CLIENT_TOKEN);
