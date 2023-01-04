/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllFiles } from "../functions/get-files.js";
import { SlashCommand, Event } from "../interfaces/index.js";
import { CustomClient } from "./Client.js";

export class Handler {
    private client: CustomClient;
    constructor (client: CustomClient) {
        this.client = client;
    }

    loadCommands(directory: string) {
        const files = getAllFiles(directory);
        if (!files.length) return;
        const publicCommands: any[] = [];
        const developerCommands: any[] = [];

        files.forEach(async (file) => {
            const command = (await import("file://" + file)).default;

            if (command.data?.developerGuild) developerCommands.push(command.data);
            else publicCommands.push(command.data);

            this.client.commands.set(command.data?.name, command.data);

            if (command instanceof SlashCommand && command.data?.autcomplete) this.client.autocomplete.set(command.data?.name, (await import("file://" + file)).default.data);
        });

        const pushCommands = async () => {
            this.client.data.developerGuilds?.forEach(async (id: string) => {
                const guild = await this.client.guilds.fetch(id);
                if (!guild) return;

                await guild.commands.set(developerCommands);
                console.log(`Developer commands have been pushed to ${guild.name}`);
            });
        };

        if (!this.client.isReady()) this.client.once("ready", () => pushCommands());
        else pushCommands();
    }

    loadEvents(directory: string) {
        const files = getAllFiles(directory);
        if (!files.length) return;

        files.forEach(async (file) => {
            const { data: event }: Event = (await import("file://" + file)).default;

            const execute = (...args: unknown[]) => event?.execute(...args, this.client);

            if (event?.event !== null) event?.once ? this.client.once(event?.event, execute) : this.client.on(event?.event, execute);
            else if (event?.event === null && event?.restEvent) event?.once ? this.client.rest.once(event?.restEvent, execute) : this.client.rest.on(event?.restEvent, execute);
            else throw new TypeError(`Event ${file.split("/").at(-2)}/${file.split("/").at(-1)} has no event name`);
        });

        console.log("Events have been loaded");
    }
}