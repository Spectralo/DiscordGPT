const { Events } = require('discord.js');
require('dotenv').config();
require('node-fetch');
const openai_token = "Bearer " + process.env.OPENAI

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    if (message.channel.isThread() && message.channel.name.includes("Conversation with")) {
      if (message.author.bot) return;
      console.log(openai_token)
      fetch('https://jamsapi.hackclub.dev/openai/chat/completions', {
        method: 'POST', //GET, POST, PUT, DELETE
        headers: {
          'Content-Type': 'application/json',
          'Authorization': openai_token,
        },
        //NOT needed with GET request
        body: JSON.stringify(
          {
            'model': 'gpt-3.5-turbo',
            'messages': [
              {
                'role': 'user',
                'content': message.content
              }
            ],
          }
        )
      })
        .then(result => result.json())
        .then(response => {
          message.reply(response.choices[0].message.content)
        })
    }
  },
};
