import { CustomClient } from "./Structure/index.js";
const client = new CustomClient({
    data: {
        token: "TOKEN",
        database: "URL",
        handlers: { commands: "./dist/commands", events: "./dist/events" },
        developerGuilds: ["id1", "id2"]
    },
    intents: 131071
});

client.start();