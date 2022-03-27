const callback = (payload, chat, data) => {
  chat.say('I am a chatbot');
};

module.exports = {
  callback,
  regex: /\b(About me)\b/gim,
  description: "Shows information about me",
  usage: "Send: 'About me'"
};