import { Client, Collection } from "discord.js";
import mongoose from "mongoose";
import { ClientDataOptions, CustomClientOptions, Cooldown, SlashCommand, CommandDataTypes } from "../interfaces/index.js";
import { Handler, Logger } from "./index.js";

export class CustomClient extends Client {
    public commands: Collection<string, CommandDataTypes> = new Collection();
    public cooldowns: Collection<string, Cooldown> = new Collection();
    public autocomplete: Collection<string, SlashCommand> = new Collection();
    public data: ClientDataOptions;
    public handlers: Handler = new Handler(this);
    public logger: Logger = new Logger();
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
        mongoose.connect(this.data.devBotEnabled && this.data.devDatabase ? this.data.devDatabase : this.data.database)
            .then((data) => {
                this.logger.info("Database", "Connected to: " + this.logger.highlight(data.connection.name, "success"));
            })
            .catch(() => {
                this.logger.error("Database", "Error Connecting to Database!");
            });
    }
}