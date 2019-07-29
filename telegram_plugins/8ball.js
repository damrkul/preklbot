

var MagicBall = function(msg) { 

if ( !config.check_chats(msg.chat.id) ) { return; }

if (typeof(msg.text) === "undefined") { return; }
msg_txt = msg.text.toString().toLowerCase();
if (!msg_txt.includes("!8ball")) { return; }


var GREEN_ANSWERS = [ 'It is certain'  ,
                  'It is decidedly so',
                  'Without a doubt',
                  'Yes -- definitely',
                  'You may rely on it',
                  'As I see it, yes',
                  'Most likely',
                  'Outlook good',
                  'Yes',
                  'Signs point to yes' ] ;

var YELLOW_ANSWERS = [ 'Reply hazy, try again', 
                   'Ask again later',
                   'Better not tell you now',
                   'Cannot predict now',
                   'Concentrate and ask again' ] ;

var RED_ANSWERS  = [ 'Dont count on it',
                 'My reply is no',
                 'My sources say no',
                 'Outlook not so good',
                 'Very doubtful',
                 'NOOOOO WAY' ] ;

var rNUM = Math.floor(Math.random() * 3);
if (rNUM == 0) {

   var choiceInt = Math.floor(Math.random() * GREEN_ANSWERS.length);
   bot.sendMessage(msg.chat.id, GREEN_ANSWERS[choiceInt] );
}

if (rNUM == 1) {

   var choiceInt = Math.floor(Math.random() * YELLOW_ANSWERS.length);
   bot.sendMessage(msg.chat.id, YELLOW_ANSWERS[choiceInt] );
}

if (rNUM == 2) {

   var choiceInt = Math.floor(Math.random() * RED_ANSWERS.length);
   bot.sendMessage(msg.chat.id, RED_ANSWERS[choiceInt] );
}

};
bot.on('message', (msg) => {
  MagicBall(msg);
})
