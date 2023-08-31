/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChannelType, EmbedBuilder } from "discord.js";
import { getAllFiles } from "../functions/get-files.js";
import { SlashCommand, Event, ContextCommand, MessageCommand } from "../interfaces/index.js";
import { CustomClient } from "./index.js";

export class Handler {
    private client: CustomClient;
    constructor (client: CustomClient) {
        this.client = client;
    }

    async loadCommands(directory: string) {
        const files = getAllFiles(directory);
        if (!files.length) return;
        const publicCommands: any[] = [];
        const developerCommands: any[] = [];

        for await (const file of files) {
            const command: SlashCommand | ContextCommand | MessageCommand = (await import("file://" + file)).default;

            if (command.data?.developerGuild) developerCommands.push(command.data);
            else publicCommands.push(command.data);

            this.client.commands.set(command.data?.name, command.data);

            if (command instanceof SlashCommand && command.data?.autcomplete) this.client.autocomplete.set(command.data?.name, command);
        }

        const pushCommands = async () => {
            this.client.data.developerGuilds?.forEach(async (id: string) => {
                const guild = await this.client.guilds.fetch(id);
                if (!guild) return;

                await guild.commands.set(developerCommands);
                this.client.logger.info("System", `Deployed Commands to: ${this.client.logger.highlight(guild.name, "success")}`);
            });
        };

        if (!this.client.isReady()) this.client.once("ready", () => pushCommands());
        else pushCommands();
    }

    async loadEvents(directory: string) {
        const files = getAllFiles(directory);
        if (!files.length) return;
        let loadedEvents = 0;

        for await (const file of files) {
            const { data: event }: Event = (await import("file://" + file)).default;

            const execute = (...args: unknown[]) => event?.execute(...args, this.client);

            if (event.event !== null) this.client[event.once ? "once" : "on"](event.event, execute);
            else if (event.event === null && event?.restEvent) this.client.rest[event.once ? "once" : "on"](event.restEvent, execute);
            else throw new TypeError(`Event ${file.split("/").at(-2)}/${file.split("/").at(-1)} has no event name`);
            loadedEvents++;
        }

        if (loadedEvents !== 0) this.client.logger.info("System", `Client Events Loaded: ${this.client.logger.highlight(loadedEvents.toString(), "success")}`);
    }

    async catchErrors() {
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTimestamp();

        const logsChannelId = this.client.data.devBotEnabled && this.client.data.devLogsChannel ? this.client.data.devLogsChannel : this.client.data.logsChannel;

        process
            .on("uncaughtException", async (err) => {
                this.client.logger.error("System", `Uncaught Exception: ${err}`);
                const channel = await this.client.channels.fetch(logsChannelId);
                if (!channel || channel.type !== ChannelType.GuildText) return;

                channel.send({
                    embeds: [
                        EmbedBuilder.from(embed)
                            .setTitle("`⚠` | Uncaught Exception/Catch")
                            .setDescription([
                                "```" + err.stack + "```"
                            ].join("\n"))
                    ]
                });
            })
            .on("uncaughtExceptionMonitor", async (err) => {
                this.client.logger.error("System", `Uncaught Exception (Monitor): ${err}`);
                const channel = await this.client.channels.fetch(logsChannelId);
                if (!channel || channel.type !== ChannelType.GuildText) return;

                channel.send({
                    embeds: [
                        EmbedBuilder.from(embed)
                            .setTitle("`⚠` | Uncaught Exception/Catch (MONITOR)")
                            .setDescription([
                                "```" + err.stack + "```"
                            ].join("\n"))
                    ]
                });
            })
            .on("unhandledRejection", async (reason: Error) => {
                this.client.logger.error("System", `Unhandled Rejection/Catch: ${reason}`);
                const channel = await this.client.channels.fetch(logsChannelId);
                if (!channel || channel.type !== ChannelType.GuildText) return;

                channel.send({
                    embeds: [
                        EmbedBuilder.from(embed)
                            .setTitle("`⚠` | Unhandled Rejection/Catch")
                            .setDescription([
                                "```" + reason.stack + "```"
                            ].join("\n"))
                    ]
                });
            });
    }
}