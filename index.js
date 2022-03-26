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

const disableInput = false;

bot.setGreetingText("Hey there! My name is, Irish.")
bot.setGetStartedButton((payload, chat) => {
  chat.getUserProfile().then(user => {
    chat.say(`Hello ${user.first_name}! What would you like to do?`);
  });
});

bot.setPersistentMenu([
  {
    title: 'Search Image',
    type: 'postback',
    payload: 'SEARCH_IMAGE'
  },
  {
    title: 'Google Search',
    type: 'postback',
    payload: 'SEARCH_GOOGLE'
  },
  {
    title: 'Solve Math',
    type: 'postback',
    payload: 'SOLVE_MATH'
  }
], disableInput);

// When user starts a convo using "Send to messenger" button
bot.on("authentication", (payload, chat) => {
  console.log(payload);
})

/*
// User clicked "Solve Math" button
bot.on("postback:SOLVE_MATH", commands.math);

// User clicked "Search Image" button
bot.on("postback:SEARCH_IMAGE", commands.searchImage);

// User clicked "Search Google" button
bot.on("postback:SEARCH_GOOGLE", commands.searchGoogle);
*/

bot.start(process.env.PORT || 8080);