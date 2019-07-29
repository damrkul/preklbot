
/*var checkList = function(id) {

    while

}
*/
 
var WhereAmI = function(msg) {
if (typeof(msg.text) === "undefined") { return; }
msg_txt = msg.text.toString().toLowerCase();
if (!msg_txt.includes("!whereami")) { return; }

    console.log(config.chat_ids);
   console.log(msg);
   bot.sendMessage(msg.chat.id, msg.chat.id);

};
bot.on('message', (msg) => {

  WhereAmI(msg);
})
