import { ClientDataOptions } from "./structure/index.js";

const data: ClientDataOptions = {
    productionToken: "Production Bot Token",
    devBotToken: "Development Bot Token",
    database: "MongoDB Database URL",
    devDatabase: "MongoDB Dev Database URL", // Delete property if none
    handlers: { commands: "./dist/commands", events: "./dist/events" },
    developerGuilds: ["ID 1", "ID 2", "ID 3"], // Delete property if none
    botOwnerIds: ["ID 1", "ID 2", "ID 3"],
    logsChannel: "Log Channel ID",
    devLogsChannel: "Dev Log Channel ID", // Delete property if none
};

export default data;