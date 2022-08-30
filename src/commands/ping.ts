import { CommandInteraction } from "discord.js";
import { Command, CustomClient } from "../Structure/index.js";

export default {
    name: "ping",
    description: "Pong",
    execute(interaction: CommandInteraction, client: CustomClient) {
        interaction.reply({ content: "Pong" });
    }
} as Command;