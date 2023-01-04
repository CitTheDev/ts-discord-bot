import { CustomClient } from "./structure/index.js";
import config from "./config.js";
import { GatewayIntentBits, Partials } from "discord.js";

const client = new CustomClient({
    data: {
        devBotEnabled: false,
        productionToken: config.productionToken,
        devBotToken: config.devToken,
        database: config.database,
        handlers: config.handlers,
        developerGuilds: config.developerGuilds
    },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
        Partials.ThreadMember
    ]
});

client.start();