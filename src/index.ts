import { CustomClient } from "./Structure/index.js";
const client = new CustomClient({
    data: {
        token: "OTg1NDY0NjE2ODcwMDkyODEw.GDqMVp.LXngSpx2-BOqw8OsSK-ZJvEk6m4RR0X5C8LfSs",
        database: "mongodb+srv://cit:123@zen.huiaw.mongodb.net/Zen?retryWrites=true&w=majority",
        handlers: { commands: "./dist/commands", events: "./dist/events" },
        developerGuilds: ["900965997215895604"]
    },
    intents: 131071
});

client.start();