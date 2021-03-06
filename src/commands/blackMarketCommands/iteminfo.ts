import { blackMarket, Vagan } from "../../util/exports.js";
import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
export default {
	async execute(interaction: CommandInteraction, command: any) {

		// Set variables
		const item = await blackMarket.items.find("name", command.args.target);

		// Let the user know if Vagan can't find the item, otherwise assign properties if they exist.
		if (!item) return interaction.reply({ content: "I couldn't find that item.", ephemeral: true });

		const embed = new MessageEmbed()
			.setAuthor((interaction.member as GuildMember)?.displayName, interaction.user?.displayAvatarURL())
			.setColor("#03b1fc")
			.setTitle(`Info for ${item.name}`)
			.setDescription(`${item.description}`)
			.addField("Cost", `${item.cost}`, true)
			.addField("Required items", (item.requiredItems ? item.requiredItems.join(", ") : "None"), true)
			.addField("Role", (item.roleGain ? `${Vagan.KBC.roles.fetch(item.roleGain)}` : "None"), true)
			.addField("Heist", (item.payout ? `Increases heist payout by ${item.payout}%` : item.winRate ? `Increases chance of winning heist by ${item.winRate}%` : "No effect on heists"), true)
			.addField("Inventory item", (item.invShow ? "✅" : "❌"));

		// Send the embed
		interaction.reply({ embeds: [embed] });
	}
};