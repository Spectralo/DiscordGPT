const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    if (message.channel.isThread() && message.channel.name.includes("Conversation with")) {
      if (message.author.bot) return;
      message.channel.send("AI Answer")
    }
  },
};
