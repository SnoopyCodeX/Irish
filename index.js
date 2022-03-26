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

// When user starts a convo using "Send to messenger" button
bot.on("authentication", (payload, chat) => {
  bot.setPersistentMenu([
    {
      title: 'My Account',
      type: 'nested',
      call_to_actions: [
        {
          title: 'Pay Bill',
          type: 'postback',
          payload: 'PAYBILL_PAYLOAD'
        },
        {
          title: 'History',
          type: 'postback',
          payload: 'HISTORY_PAYLOAD'
        },
        {
          title: 'Contact Info',
          type: 'postback',
          payload: 'CONTACT_INFO_PAYLOAD'
        }
      ]
    },
    {
      title: 'Go to Website',
      type: 'web_url',
      url: 'http://purple.com'
    }
  ], disableInput);
});

bot.on("referral", (payload, chat) => {
  bot.setPersistentMenu([
    {
      title: 'My Account',
      type: 'nested',
      call_to_actions: [
        {
          title: 'Pay Bill',
          type: 'postback',
          payload: 'PAYBILL_PAYLOAD'
        },
        {
          title: 'History',
          type: 'postback',
          payload: 'HISTORY_PAYLOAD'
        },
        {
          title: 'Contact Info',
          type: 'postback',
          payload: 'CONTACT_INFO_PAYLOAD'
        }
      ]
    },
    {
      title: 'Go to Website',
      type: 'web_url',
      url: 'http://purple.com'
    }
  ], disableInput);
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