import { ClientOptions } from "discord.js";

export interface CustomClientOptions extends ClientOptions {
    data: ClientDataOptions;
}

export interface ClientDataOptions {
    token: string;
    database: string;
    developerGuilds?: string[];
}