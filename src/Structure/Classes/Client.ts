import { Client, Collection } from "discord.js";
import { ClientDataOptions, CustomClientOptions } from "../Interfaces/ClientOptions";
import { Command } from "../Interfaces/Command";
import { Event } from "../Interfaces/Event";
import { Handler } from "./Handler";

export class CustomClient extends Client {
    public commands: Collection<string, Command>;
    public events: Collection<string, Event>;
    public data: ClientDataOptions;
    public handlers: Handler;
    /**
     * Initialise the client
     * @param {ClientOptions} options 
     * @param {{ token: string, database: string, developerGuilds?: string[] }} options.data
     */
    constructor (options: CustomClientOptions) {
        super (options);
        this.commands = new Collection();
        this.events = new Collection();
        this.data = options.data;
        this.handlers = new Handler(this);
    }
}