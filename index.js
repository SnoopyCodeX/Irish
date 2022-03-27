const BootBot = require("better-bootbot");
const dotenv = require("dotenv");
const commands = require("./commands/all");

// Hard-coded for now.
commands.names = [
  'About Me',
  'Solve Math',
  'Search Image',
  'Search Google',
  'Search Wiki',
  'Define Word'
];

dotenv.config();

// Initialize bot
const bot = new BootBot({
  accessToken: process.env.ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.SECRET
});

bot.deletePersistentMenu();
bot.deleteGetStartedButton();

bot.setGreetingText("Hey there! My name is, Irish. I am a student-friendly chatbot whose sole-purpose is to be of help to all the students that does not have internet for their homeworks/activities.")
bot.setGetStartedButton((payload, chat) => {
  chat.getUserProfile().then(user => {
    chat.say({
      text: `Hello ${user.first_name}! What would you like to do?`,
      quickReplies: commands.names
    });
  });
});

// When user starts a convo using "Send to messenger" button
bot.on("authentication", (payload, chat) => {
  console.log(payload);
})

bot.on("referral", (payload, chat) => {
  console.log(payload);
  
  chat.getUserProfile().then(user => {
    chat.say({
      text: `Welcome back, ${user.first_name}! What would you like to do?`,
      quickReplies: commands.names
    });
  });
})

bot.on('quick_reply', (payload, chat) => {
  console.log(payload)
  chat.say(`Received ${payload.message.quick_reply}`)
});

bot.start(process.env.PORT || 8080);