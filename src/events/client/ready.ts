import { Event, CustomClient } from "../../Structure/index.js";

export default {
    name: "ready",
    once: true,
    execute(client: CustomClient) {
        console.log(`Logged in as ${client.user?.tag}`);
    }
} as Event;