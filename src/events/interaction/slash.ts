import { CommandInteraction, EmbedBuilder, PermissionsBitField } from "discord.js";
import { Event, CustomClient } from "../../Structure/index.js";

export default {
    name: "interactionCreate",
    async execute(interaction: CommandInteraction, client: CustomClient) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        const embed = new EmbedBuilder();
        await client.application?.fetch();

        if (!command) {
            embed
                .setColor("Red")
                .setDescription(`This command does not exist`);
            return await interaction.reply({ embeds: [embed], ephemeral: true }) && client.commands.delete(interaction.commandName);
        }

        if (command.botOwnerOnly && client.application?.owner?.id !== interaction.user.id) {
            embed
                .setColor("Red")
                .setDescription(`This command is only available for the bot owner`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!interaction.guild?.members?.me?.permissions.has(PermissionsBitField.Flags.Administrator)) {
            if (!command.botPermissions?.length) return;

            let invalidBotPerms = [];
            invalidBotPerms = command.botPermissions.filter((perm) => !interaction.guild?.members?.me?.permissions.has(perm));

            if (invalidBotPerms.length > 0) {
                embed
                    .setColor("Red")
                    .setDescription(`I need the \`${invalidBotPerms.join(", ")}\` permission(s) to run this command`);
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }

        command.execute(interaction, client);
    }
} as Event;