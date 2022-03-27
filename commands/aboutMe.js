const callback = (payload, chat) => {
  chat.say({
    text:'I am a chatbot',
    quickReplies: ['Exit this command']
  });
};

module.exports = {
  callback,
  name: "About Me"
};