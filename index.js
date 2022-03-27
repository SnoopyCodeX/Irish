const BootBot = require("better-bootbot");
const dotenv = require("dotenv");
const commands = require("./commands/all");
dotenv.config();

// Initialize bot
const bot = new BootBot({
  accessToken: process.env.ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.SECRET
});

bot.setGreetingText("Hey there! My name is, Elvie. I am a student-friendly chatbot whose sole-purpose is to be of help to all the students that does not have internet for their homeworks/activities.")
bot.setGetStartedButton((payload, chat) => {
  console.log(payload);
  
  chat.getUserProfile().then(user => {
    chat.say({
      text: `Hello ${user.first_name}! What would you like to do?`,
      buttons: [
        {type: "postback", title: "Show all commands", payload: "SHOW_COMMANDS"}
      ]
    });
  });
  
});

bot.on("referral", (payload, chat) => {
  console.log(payload);
  
  let senderID = payload.sender.id;
  let convoRecords = convoUtils.openConvoRecords();
  
  if(convoRecords[senderID] !== undefined) {
    delete convoRecords[senderID];
    convoUtils.saveConvoRecords(convoRecords);
  }
  
  chat.getUserProfile().then(user => {
    chat.say({
      text: `Welcome back, ${user.first_name}! What would you like to do?`,
      buttons: [
        {type: "payload", title: "Show all commands", payload: "SHOW_COMMANDS"}
      ]
    });
  });
});

bot.hear(/\b(Show all commands)\b/gim, (payload, chat) => {
  let message = "Available Commands:\n\n";
  let counter = 1;
  
  for(let cmd in commands) {
    message += `${counter++}. ${commands[cmd].description}\n\n`;
    message += `⟩ Usage: ${commands[cmd].usage}\n\n`;
  }
  
  chat.say(message);
});

// Commands
for(let cmd in commands)
  bot.hear(commands[cmd].regex, commands[cmd].callback);

bot.start(process.env.PORT || 8080);