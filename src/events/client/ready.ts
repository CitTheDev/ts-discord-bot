import { Events } from "discord.js";
import { Event, CustomClient } from "../../structure/index.js";

export default new Event({
    event: Events.ClientReady,
    once: true,
    execute(client: CustomClient) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        client.logger.info("System", `Successfully Logged in to : ${client.logger.highlight(client.user!.tag, "success")}`);
    }
});