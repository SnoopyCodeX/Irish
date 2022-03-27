const callback = (payload, chat) => {
  chat.say({
    text:'I am a chatbot'
    quickReplies: ['Show Menu']
  });
  
};

module.exports = {
  callback,
  name: "About Me"
};