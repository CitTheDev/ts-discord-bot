import { ClientOptions } from "discord.js";

export interface CustomClientOptions extends ClientOptions {
    data: ClientDataOptions;
}

export interface ClientDataOptions {
    productionToken: string;
    devBotToken: string;
    devBotEnabled?: boolean;
    database: string;
    devDatabase?: string;
    developerGuilds?: string[];
    handlers: { commands: string, events: string },
    logsChannel: string;
    devLogsChannel?: string;
    botOwnerIds: string[];
}