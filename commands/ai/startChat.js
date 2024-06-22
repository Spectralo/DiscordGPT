const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('startchat')
    .setDescription('Start a chat with the AI.'),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    const channel = interaction.channel;
    await interaction.reply(`Launching AI talking to ${interaction.user.username}`);
    const thread_name = "Conversation with " + interaction.user.username;
    const thread = await channel.threads.create({
      name: thread_name,
    });
    thread.send("Hey, talk to me!")

  },
};
