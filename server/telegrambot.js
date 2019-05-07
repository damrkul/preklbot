

Meteor.startup(function () {

const TelegramBot = require('node-telegram-bot-api');

///////////// BOT STUFF


// replace the value below with the Telegram token you receive from @BotFather
const token = '733433420:AAE7TIy9oiVEJ-mTXjqmK_5lKnfJ5KyA_no';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

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

var getCollection = function(collection, msg) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:3001/meteor";
    var xx =  {};
    if (typeof(msg.text) === "undefined") { return; }
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
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

});
