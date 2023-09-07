const { EmbedBuilder } = require('discord.js');

const db = require('./database'); // Import the database

module.exports.setupCommands = (client, prefix) => {
    const storeInDatabase = (interation, collector, dateStr) => {
        const user = interation.author;
        // Store the birthday in the database
        db.run('INSERT OR REPLACE INTO users (user_id, username, birthday) VALUES (?, ?, ?)', [user.id, user.username, dateStr], (err) => {
            if (err) {
                console.error('Error storing birthday in the database:', err.interation);
            } else {
                interation.channel.send(`Birthday set for ${user.username}: ${dateStr}`);
            }
        });
        if (collector) {
            collector.stop(); // Stop the collector once you have a valid date
        }
    }

    const sendMessage = (interation, message) => {
        interation.channel.send(message);
    }

    client.on("messageCreate", async (interation) => {
        if (interation.author.bot) return;
        if (!interation.content.startsWith(prefix)) return;

        const interationContent = interation.content.slice(prefix.length).trim().split(' ');
        const command = interationContent.shift().toLowerCase();
        const args = interationContent.pop();

        if (command === 'setbirthday') {
            const regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

            if (args) {
                if (args.match(regexDate)) {
                    storeInDatabase(interation, null, args)
                } else {
                    sendMessage(interation, 'Invalid date format, please try again (MM/DD):')
                }
            } else {
                const collectorFilter = m => m.author.id === interation.author.id; // Only collect interations from the same user
                const collector = interation.channel.createMessageCollector({ filter: collectorFilter, time: 15000 });

                sendMessage(interation, 'Please enter your birthday in the format MM/DD (e.g., 01/12):')

                collector.on('collect', async (userinteration) => {
                    const dateStr = userinteration.content;
                    if (!dateStr.match(regexDate)) {
                        sendMessage(interation, 'Invalid date format, please try again (MM/DD):')
                    } else {
                        storeInDatabase(interation, collector, dateStr)
                    }
                });

                collector.on('end', (collected, reason) => {
                    if (reason === 'time') {
                        sendMessage(interation, 'Time for input has expired.')
                    }
                });
            }

        } else if (command === 'birthday') {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Upcoming Birthdays');

            // Retrieve birthdays from the database
            db.all('SELECT username, birthday FROM users ORDER BY birthday ASC', (err, rows) => {
                if (err) {
                    console.error('Error retrieving birthdays from the database:', err.interation);
                    return;
                }

                // Add each birthday to the embed
                rows.forEach((row) => {
                    embed.addFields({ name: row.username, value: `Birthday: ${row.birthday}` });
                });

                sendMessage(interation, { embeds: [embed] })
            });
        }

    });
};
