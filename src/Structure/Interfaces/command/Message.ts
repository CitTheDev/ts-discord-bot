import { ApplicationCommandType, MessageContextMenuCommandInteraction } from "discord.js";
import { BaseApplicationCommand } from "./Base.js";
import { CustomClient } from "../../classes/Client.js";

export class MessageCommand {
    public data: MessageCommandData;
    constructor (options: MessageCommandData) {
        this.data = options;
        this.data.type = ApplicationCommandType.Message;
    }
}

export interface MessageCommandData extends BaseApplicationCommand {
    type?: ApplicationCommandType.Message;
    execute: (interaction: MessageContextMenuCommandInteraction, client: CustomClient) => unknown;
}