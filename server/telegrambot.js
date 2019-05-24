
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
  
global.MongoClient = require('mongodb').MongoClient;
/*var getCollection = function(collection, msg) {
    global.MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:3001/meteor";
    var xx =  {};
    if (typeof(msg.text) === "undefined") { return; }
    global.MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("meteor");
        dbo.collection(collection).find({}).toArray((err, result) => {
            result.forEach(function(element) {
                msg_txt = msg.text.toString().toLowerCase();
                element_txt = element.phrase.toString().toLowerCase();
                if (msg_txt.includes(element_txt)) {
                    bot.sendMessage(msg.chat.id, element.reply );
                }
            });
            db.close();
        });
    });
}


bot.on('message', (msg) => {
  getCollection("phrases",msg);
});
*/

var plugins = require("./plugins.js");

console.log("HEHEHEHHEHE");
console.log(plugins.length);

eval(plugins[1]);
eval(plugins[0]);
eval(plugins[2]);
//eval(plugins[1]);
//console.log(plugins[0]);
//console.log(plugins[1]);
//console.log(plugins[0]);


});
