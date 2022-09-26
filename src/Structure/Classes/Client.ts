import { Client, Collection } from "discord.js";
import mongoose from "mongoose";
import { ClientDataOptions, CustomClientOptions } from "../Interfaces/ClientOptions.js";
import { Command } from "../Interfaces/Command.js";
import { Event } from "../Interfaces/Event.js";
import { Handler } from "./Handler.js";

export class CustomClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public data: ClientDataOptions;
    public handlers: Handler = new Handler(this);
    constructor (options: CustomClientOptions) {
        super(options);
        this.data = options.data;
    }

    async start() {
        this.handlers.loadEvents(this.data.handlers.events);
        this.handlers.loadCommands(this.data.handlers.commands);

        this.login(this.data.token);
        mongoose.connect(this.data.database).then(() => console.log("Connected to the database"));
    }
}