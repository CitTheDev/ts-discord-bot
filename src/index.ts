import { CustomClient } from "./Structure/index.js";
import config from "./config";
import { GatewayIntentBits, Partials } from "discord.js";

const client = new CustomClient({
    data: {
        token: config.token,
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