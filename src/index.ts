import { CustomClient } from "./structure/index.js";
import config from "./config.js";
import { GatewayIntentBits, Partials } from "discord.js";

const client = new CustomClient({
    data: {
        ...config,
        devBotEnabled: false // Change to true for development
    },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Partials.GuildMember,
        Partials.Message,
    ]
});

client.start();