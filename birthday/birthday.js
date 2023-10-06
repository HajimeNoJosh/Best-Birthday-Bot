// This file handles birthday-related logic
const db = require('./database'); // Import the database

module.exports.checkAndSendBirthdayMessages = (client) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-us", {
        day: "2-digit",
        month: "2-digit",
    });

    const guild = client.guilds.resolve(process.env.GUID_ID);
    const channel = guild.channels.resolve(process.env.CHANNEL_ID);

    if (!channel) {
        console.error('Channel not found in guild:', guild.name);
        return;
    }

    // Retrieve birthdays from the database
    db.all('SELECT user_id, username, birthday FROM users', (err, rows) => {
        if (err) {
            console.error('Error retrieving birthdays from the database:', err.message);
            return;
        }

        rows.forEach((row) => {
            if (row.birthday === formattedDate) {
                guild.members.fetch().then((members) => {
                    members.forEach((member) => {
                        if (member.user.id === row.user_id) {
                            const messageContent = `Happy Birthday, <@${member.user.id}>! 🎉🎂`;
                            channel.send(messageContent)
                                .then(() => {
                                    console.log('Birthday message sent successfully.');
                                })
                                .catch((error) => {
                                    console.error('Error sending birthday message:', error);
                                });
                        }
                    });
                });
            }
        });
    });
};
