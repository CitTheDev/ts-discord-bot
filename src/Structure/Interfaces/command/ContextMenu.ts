import { ApplicationCommandType, UserContextMenuCommandInteraction } from "discord.js";
import { BaseApplicationCommand } from "./Base.js";
import { CustomClient } from "../../classes/Client.js";

export class ContextCommand {
    public data: ContextCommandData;
    constructor (options: ContextCommandData) {
        this.data = options;
        this.data.type = ApplicationCommandType.User;
    }
}

export interface ContextCommandData extends BaseApplicationCommand {
    type?: ApplicationCommandType.User;
    execute: (interaction: UserContextMenuCommandInteraction, client: CustomClient) => unknown;
}