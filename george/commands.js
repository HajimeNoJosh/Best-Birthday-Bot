module.exports.setupPinCommands = (client, Events) => {
    const getKyleSaying = () => {
        const sayings = ["Yare Yare", "Irl is just ikea innit", "Hell yeah!", "LOL", "Only nuts I can have", "No peanuts or treenuts though!", "Things are just complicated",
            "I'm in", "Imagine my shock when v-tubers were anime chicks and not potatoes", "Please photoshop me out as I did not give consent", "You come for the shrimp, you gonna get the <:juicy_meat:1104210007194611846>", "Hey kid can I have that?", "It's statistically the best time to guess."]
        const randomSaying = Math.floor(Math.random() * sayings.length);
        return sayings[randomSaying]
    }

    const getSnarkyResponse = () => {
        const snarkyResponses = [
            "Well, look who's trying to be organized today!",
            "Pinning messages like a pro, I see.",
            "You're really raising the bar with your pinning skills.",
            "Someone's trying to impress the chat with their pinning abilities.",
            "Pinning this message? That's a bold move, Cotton.",
            "Sure, go ahead and pin it. Like that's gonna change everything!",
            "Congratulations, you just earned a virtual gold star for pinning.",
            "Pinning messages: The pinnacle of human achievement.",
            "Oh, look at you, pinning messages and all. So fancy!",
            "And the award for 'Most Pinned Messages' goes to... you!",
            "Well, well, well, what's this? Someone's the King or Queen of Pins today, huh?",
            "Pinning messages like a real trailblazer, I see. The pinning pioneer!",
            "You're really going all out with your pins, aren't you? Pinning excellence at its finest.",
            "Look at you, pinning messages like there's no tomorrow. The pin mastermind!",
            "Pinning this message, are we? That's one small step for chat, one giant leap for pins.",
            "Sure, why not pin it? Because clearly, pins make the world go round!",
            "Congratulations! You've just unlocked the 'Pin-termediate' achievement. Impressive!",
            "Pinning messages: The 21st-century art form. You're the Van Gogh of pins!",
            "Oh, fancy-pants, pinning messages like it's a red carpet event. You're the star!",
            "And the pin-tastic award for 'Pinfluencer of the Day' goes to... you!"
        ];

        const randomResponse = Math.floor(Math.random() * snarkyResponses.length);
        return snarkyResponses[randomResponse];
    };

    const getSnarkyQuote = (quote) => {
        const snarkyQuotes = [
            `Kyle once graced us with this gem: "${quote}"`,
            `In the never-ending wisdom of Kyle: "${quote}"`,
            `You're in for a treat because Kyle has a saying: "${quote}"`,
            `"As the indomitable Kyle once graced us with: "${quote}"`,
            `Kyle's pearls of wisdom: "${quote}"`,
            `Prepare to be enlightened by Kyle's profound words: "${quote}"`,
            `Kyle's contribution to humanity: "${quote}"`,
            `Kyle's unique perspective on life: "${quote}"`,
            `Kyle's take on the matter: "${quote}"`,
            `"Allow me to present Kyle's deep thoughts: "${quote}"`,
            `Kyle's philosophy distilled: "${quote}"`,
            `"In the annals of history, Kyle once quipped: "${quote}"`,
            `The world-changing words of Kyle: "${quote}"`,
            `Kyle's words to live by: "${quote}"`,
            `Behold, the profound musings of Kyle: "${quote}"`,
            `In the vast tapestry of human existence, Kyle once declared: "${quote}"`,
            `Prepare yourselves for the wisdom of Kyle: "${quote}"`,
            `You're about to experience a revelation from none other than Kyle: "${quote}"`,
            `Kyle's pearls of existential wisdom: "${quote}"`,
            `Let me introduce you to Kyle's grand theory of life: "${quote}"`,
            `Witness the enlightenment of Kyle's thoughts: "${quote}"`,
            `Kyle's life-altering insights for your consideration: "${quote}"`,
            `Kyle's take on the universe: "${quote}"`,
            `Join me in exploring Kyle's groundbreaking philosophy: "${quote}"`,
            `In the hallowed halls of Kyle's mind, we find: "${quote}"`,
            `Kyle's words, destined to reshape history: "${quote}"`,
            `Kyle's guide to thriving in an absurd world: "${quote}"`,
            `Kyle's nuggets of wisdom, hot off the press: "${quote}"`,
            `For your intellectual delight, here's Kyle's latest revelation: "${quote}"`
        ];

        const randomQuote = Math.floor(Math.random() * snarkyQuotes.length);
        return snarkyQuotes[randomQuote];
    };

    client.on(Events.MessageReactionAdd, async (reaction) => {
        if (reaction.message.system) {
            return;
        }

        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }

        if (reaction.emoji.name === '📌') {
            if (!reaction.message.pinned) {
                try {
                    await reaction.message.pin();
                    const snarkyResponse = getSnarkyResponse();
                    reaction.message.channel.send(snarkyResponse);
                } catch (error) {
                    console.error('Something went wrong when pinning the message:', error);
                }
            }
        }

        if (reaction.emoji.id === "1099183536629616731") {
            reaction.message.channel.send(`${getSnarkyQuote(getKyleSaying())}`);
        }
    });

    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
        if (message.content.includes("<:pickyle:1099183536629616731>")) {
            message.channel.send(`${getSnarkyQuote(getKyleSaying())}`);
        }
    });
};
