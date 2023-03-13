import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { SlashCommand, CustomClient } from "../../structure/index.js";

export default new SlashCommand({
    name: "reload",
    description: "Reload application commands",
    developerGuild: true,
    defaultMemberPermissions: PermissionFlagsBits.Administrator,
    async execute(interaction: ChatInputCommandInteraction, client: CustomClient) {
        const embed = new EmbedBuilder();

        if (client.token === client.data.devBotToken) {
            embed
                .setColor("Red")
                .setDescription("<:rejected:992377193013452860> Cannot reload commands for developer bot");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        embed
            .setColor("Green")
            .setDescription("<:approved:992377190274576454> Application commands have been pushed");

        await client.application?.commands.set(Array.from(client.commands.values()).filter((command) => command.developerGuild === false) as []);

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
});