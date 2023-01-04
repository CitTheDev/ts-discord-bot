import { Client, Collection } from "discord.js";
import mongoose from "mongoose";
import { ClientDataOptions, CustomClientOptions, Cooldown, SlashCommand, BaseApplicationCommand } from "../interfaces/index.js";
import { Handler } from "./Handler.js";

export class CustomClient extends Client {
    public commands: Collection<string, BaseApplicationCommand> = new Collection();
    public cooldowns: Collection<string, Cooldown> = new Collection();
    public autocomplete: Collection<string, SlashCommand> = new Collection();
    public data: ClientDataOptions;
    public handlers: Handler = new Handler(this);
    constructor (options: CustomClientOptions) {
        super (options);
        this.data = options.data;
        this.setMaxListeners(20);
    }

    async start() {
        this.handlers.loadEvents(this.data.handlers.events);
        this.handlers.loadCommands(this.data.handlers.commands);

        this.login(this.data.devBotEnabled ? this.data.devBotToken : this.data.productionToken);

        mongoose.set("strictQuery", true);
        mongoose.connect(this.data.database)
            .then(() => console.log("Connected to the database"));
    }
}