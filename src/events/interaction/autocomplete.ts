import { AutocompleteInteraction, Events } from "discord.js";
import { CustomClient, Event } from "../../structure/index.js";

export default new Event({
    event: Events.InteractionCreate,
    execute(interaction: AutocompleteInteraction, client: CustomClient) {
        if (!interaction.isAutocomplete()) return;
        const autocomplete = client.autocomplete.get(interaction.commandName);
        if (!autocomplete) return;

        if (!autocomplete.data.executeAutocomplete) throw new TypeError("The command was set as autocomplete but no autocomplete function was provided");

        autocomplete.data.executeAutocomplete(interaction, client);
    }
});