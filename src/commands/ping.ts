import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommand, CustomClient } from "../structure/index.js";

export default new SlashCommand({
    name: "ping",
    description: "Pong",
    execute(interaction: ChatInputCommandInteraction, client: CustomClient) {
        interaction.reply({ content: "Pong" });
    }
});