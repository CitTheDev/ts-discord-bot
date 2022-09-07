import { CustomClient } from "./Structure/index.js";
import config from "./config";

const client = new CustomClient({
    data: {
        token: config.token,
        database: config.database,
        handlers: config.handlers,
        developerGuilds: config.developerGuilds
    },
    intents: 131071
});

client.start();