
// Config file to edit Token file
const config= require('./config');


const plugin= require('./plugins');
Meteor.startup(function () {

//import './config.js';
const TelegramBot = require('node-telegram-bot-api');

///////////// BOT STUFF


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(config.token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});


// Listen for any kind of message. There are different kinds of
// messages.

// Add in Global Variables to use in Plugins..  
global.MongoClient = require('mongodb').MongoClient;



//  LOAD IN PLUGINS
var plugins = require("./plugins.js");

for ( var i = 0 ; i< plugins.length;i++ ) {
    eval(plugins[i]);
} 


});
