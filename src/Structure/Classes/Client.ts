import { Client, Collection } from "discord.js";
import mongoose from "mongoose";
import { ClientDataOptions, CustomClientOptions } from "../Interfaces/ClientOptions.js";
import { Command } from "../Interfaces/Command.js";
import { Event } from "../Interfaces/Event.js";
import { Handler } from "./Handler.js";

export class CustomClient extends Client {
    public commands: Collection<string, Command>;
    public events: Collection<string, Event>;
    public data: ClientDataOptions;
    public handlers: Handler;
    /**
     * Initialise the client
     * @param {import("../Interfaces/ClientOptions").CustomClientOptions} options 
     */
    constructor (options: CustomClientOptions) {
        super (options);
        this.commands = new Collection();
        this.events = new Collection();
        this.data = options.data;
        this.handlers = new Handler(this);
    }

    /**
     * Start the client
     */
    async start() {
        this.handlers.loadEvents(this.data.handlers.events);
        this.handlers.loadCommands(this.data.handlers.commands);
        await mongoose.connect(this.data.database);

        this.login(this.data.token);
    }
}