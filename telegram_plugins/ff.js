
var getCollection = function(collection, msg) {
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
})
