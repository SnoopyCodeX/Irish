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

// When user starts a convo using "Send to messenger" button
bot.hear(["hey"], (payload, chat) => {
  // Get user profile
  chat.getUserProfile().then(user => {
    // Send options to user
    chat.say({
      text: `Hi ${user.first_name}, how may I help you?`,
      buttons: [
        {type: "postback", title: "Solve Math", payload: "SOLVE_MATH"},
        {type: "postback", title: "Search Image", payload: "SEARCH_IMAGE"},
        {type: "postback", title: "Google Search", payload: "SEARCH_GOOGLE"},
        {type: "postback", title: "Define Word", payload: "DEFINE_WORD"},
        {type: "postback", title: "Wiki Search", payload: "SEARCH_WIKI"},
      ]
    });
  });
});

/*
// User clicked "Solve Math" button
bot.on("postback:SOLVE_MATH", commands.math);

// User clicked "Search Image" button
bot.on("postback:SEARCH_IMAGE", commands.searchImage);

// User clicked "Search Google" button
bot.on("postback:SEARCH_GOOGLE", commands.searchGoogle);
*/

bot.start(process.env.PORT || 8080);