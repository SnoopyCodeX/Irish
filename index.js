const BootBot = require("better-bootbot");
const dotenv = require("dotenv");
const commands = require("./commands/all");
const convoUtils = require("./utils/convoUtils");
dotenv.config();

// Initialize bot
const bot = new BootBot({
  accessToken: process.env.ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.SECRET
});

bot.deleteGetStartedButton();
bot.deletePersistentMenu();

bot.setGreetingText("Hey there! My name is, Elvie. I am a student-friendly chatbot whose sole-purpose is to be of help to all the students that does not have internet for their homeworks/activities.")
bot.setGetStartedButton((payload, chat) => {
  console.log(payload);
  
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
  
  let senderID = payload.sender.id;
  let convoRecords = convoUtils.openConvoRecords();
  
  if(convoRecords[senderID] !== undefined) {
    delete convoRecords[senderID];
    convoUtils.saveConvoRecords(convoRecords);
  }
  
  chat.getUserProfile().then(user => {
    chat.say({
      text: `Welcome back, ${user.first_name}! What would you like to do?`,
      quickReplies: commands.names
    });
  });
});

bot.on("message", (payload, chat) => {
  console.log(payload);
  let senderID = payload.sender.id;
  let convoRecords = convoUtils.openConvoRecords();
  
  // Ignore quick replies
  if(payload.message.quick_reply !== undefined)
    return;
  
  // If sender has a selected command, reroute the payload to the command.
  if(convoRecords[senderID] !== undefined)
    return commands[convoRecords[senderID]['commandSelected']].callback(payload, chat);
});

bot.on('quick_reply', (payload, chat) => {
  console.log(payload);
  
  let senderID = payload.sender.id;
  let convoRecords = convoUtils.openConvoRecords();
  
  if(payload.message.quick_reply === "BOOTBOT_QR_EXITTHISCOMMAND") {
    delete convoRecords[senderID];
    convoUtils.saveConvoRecords(convoRecords);
    
    chat.say({
      text: 'What would you like to do next?',
      quickReplies: commands.names
    });
    
    return;
  }
  
  // If selectedCommand is not undefined
  if(convoRecords[senderID] !== undefined)
    return commands[convoRecords[senderID]['commandSelected']].callback(payload, chat);
  
  // Loop through all commands
  for(let command in commands) {
    if(command === 'names') continue;
    
    // Get their payload tags (QR = Quick Reply)
    let cmdTagQR = `BOOTBOT_QR_${commands[command].name.replace(/\s/g, '').toUpperCase()}`;
    let curTagQR = payload.message.quick_reply;
    
    // If their tags matches
    if(cmdTagQR === curTagQR) {
      // Execute command callback
      commands[command].callback(payload, chat);
      
      // Store selected command
      convoRecords[senderID]['selectedCommand'] = commands[command];
      convoUtils.saveConvoRecords(convoRecords);
      
      break; // Stop looping
    }
  }
});

bot.start(process.env.PORT || 8080);