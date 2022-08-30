import { getAllFiles } from "../Functions/get-files.js";
import { Command } from "../Interfaces/Command.js";
import { Event } from "../Interfaces/Event.js";
import { CustomClient } from "./Client.js";

export class Handler {
    #client: CustomClient;
    /**
     * Create a new handler instance
     * @param {CustomClient} client 
     */
    constructor (client: CustomClient) {
        this.#client = client;
    }

    /**
     * Load the commands
     * @param {string} directory 
     */
    loadCommands(directory: string) {
        const files = getAllFiles(directory);
        if (!files.length) return;
        let publicCommands: Command[] = [];
        let developerCommands: Command[] = [];

        files.forEach(async (file) => {
            const command: Command = await import(file);

            if (command.developer) developerCommands.push(command);
            else publicCommands.push(command);

            this.#client.commands.set(command.name, command);
            return delete require.cache[require.resolve(file)];
        });

        const pushCommands = async () => {
            await this.#client.application?.commands.set(publicCommands);
            this.#client.data.developerGuilds?.forEach(async (id: string) => {
                const guild = this.#client.guilds.cache.get(id);
                if (!guild) return;

                await guild.commands.set(developerCommands);
            });
        }

        if (!this.#client.isReady()) this.#client.once("ready", () => pushCommands());
        else pushCommands();
    }

    /**
     * Load the events
     * @param {string} directory 
     */
    loadEvents(directory: string) {
        const files = getAllFiles(directory);
        if (!files.length) return;

        files.forEach(async (file) => {
            const event: Event = require(file);
            const directory: string = `${file.split("/").at(-2)}/${file.split("/").at(-1)}`;

            this.#client.events.set(event.name + `-${directory}`, event);
            const execute = (...args: any[]) => event.execute(...args, this.#client);

            if (event.rest) event.once ? this.#client.rest.once(event.name, execute) : this.#client.rest.on(event.name, execute);
            else event.once ? this.#client.once(event.name, execute) : this.#client.on(event.name, execute);

            return delete require.cache[require.resolve(file)];
        });
    }

    /**
     * Reload systems
     * @param {"commands" | "events"} system 
     * @param {string} directory 
     */
    async reload(system: "commands" | "events", directory: string) {
        if (system === "events") {
            for (const [ key, value ] of this.#client.events) {
                if (value.rest) this.#client.rest.removeListener(key.split("-")[0], value.execute);
                else this.#client.removeListener(key.split("-")[0], value.execute);
            }

            this.#client.events.clear();
            this.loadEvents(directory);
        } else {
            this.#client.commands.clear();
            this.loadCommands(directory)
        };
    }
}