// Initialize dotenv
require('dotenv').config();
const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { setupPinCommands } = require('./george/commands');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    setupPinCommands(client, Events);
});

// Log in to the bot using your token
client.login(process.env.CLIENT_TOKEN);
