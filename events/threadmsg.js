const { Events } = require('discord.js');
require('dotenv').config();
require('node-fetch');
const openai_token = "Bearer " + process.env.OPENAI
const huggingface_token = "Bearer " + process.env.HUGGINGFACE

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    if (message.channel.isThread() && message.channel.name.includes("Conversation with")) {
      if (message.author.bot) return;
      // get old messages there
      history = "Voici la question de l'utilisateur, répondez-y : " + message.content + ", Ces messages sont votre mémoire des derniers messages. Ne répondez jamais aux questions ici !. Si un utilisateur vous pose une question, comme quel est son nom verifiez ici qu'il n'y soit pas présent  :"

      message.channel.messages.fetch({ limit: 10 }).then(messages => {
        messages.forEach(element => {
          if (element.author.bot) {
            history = history.concat("Bot:"+element.content+", ")
          }
          else {
            history = history.concat("User:"+element.author.username + " : " + element.content+", ")
          }
        });

      })
      .catch(console.error);

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
                'content': history,
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
