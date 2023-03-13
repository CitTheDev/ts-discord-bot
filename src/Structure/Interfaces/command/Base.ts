import { BaseApplicationCommandData, ChatInputCommandInteraction, MessageContextMenuCommandInteraction, PermissionResolvable, UserContextMenuCommandInteraction } from "discord.js";
import { CustomClient } from "../../classes/index.js";

export interface BaseApplicationCommand extends BaseApplicationCommandData {
    developerGuild?: boolean;
    cooldown?: number;
    botOwnerOnly?: boolean;
    botPermissions?: PermissionResolvable[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    execute: (interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction, client: CustomClient) => any;
}