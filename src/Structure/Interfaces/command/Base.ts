import { BaseApplicationCommandData, PermissionResolvable } from "discord.js";
import { ContextCommand, ContextCommandData, MessageCommand, MessageCommandData, SlashCommand, SlashCommandData } from "./index.js";

export type CommandDataTypes = SlashCommandData | ContextCommandData | MessageCommandData;
export type CommandTypes = SlashCommand | ContextCommand | MessageCommand;

export interface BaseApplicationCommand extends BaseApplicationCommandData {
    developerGuild?: boolean;
    cooldown?: number;
    botOwnerOnly?: boolean;
    botPermissions?: PermissionResolvable[];
}