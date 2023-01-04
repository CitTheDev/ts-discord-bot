import { Event, CustomClient } from "../../structure/index.js";

export default new Event({
    event: "ready",
    once: true,
    execute(client: CustomClient) {
        console.log(`Logged in as ${client.user?.tag}`);
    }
});