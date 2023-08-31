import { ApplicationCommandOptionData, ApplicationCommandType, AutocompleteInteraction, ChatInputCommandInteraction, LocalizationMap } from "discord.js";
import { CustomClient } from "../../classes/index.js";
import { BaseApplicationCommand } from "./Base.js";

export class SlashCommand {
    public data: SlashCommandData;
    constructor (options: SlashCommandData) {
        this.data = options;
        this.data.type = ApplicationCommandType.ChatInput;
    }
}

export interface SlashCommandData extends BaseApplicationCommand {
    description: string;
    descriptionLocalizations?: LocalizationMap;
    options?: ApplicationCommandOptionData[];
    type?: ApplicationCommandType.ChatInput;
    autcomplete?: boolean;
    execute: (interaction: ChatInputCommandInteraction, client: CustomClient) => unknown;
    executeAutocomplete?: (interaction: AutocompleteInteraction, client: CustomClient) => unknown;
}

export interface Cooldown {
    timeout: number;
    started: number;
}