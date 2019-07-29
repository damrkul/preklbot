
var getTag  = function(collection, msg) {
    if (msg.chat.id != "-383921851") { return; }
    absURL = Meteor.absoluteUrl();
    // Get Port
    port = absURL.split(":")[2].split("/")[0];
    port = parseInt(port)+1;

    // Get MongoURL
    mongoURL = Meteor.absoluteUrl().split("//")[1].split(":")[0];

    var url = "mongodb://"+ mongoURL + ":"+ String(port) + "/meteor";
    

    if (typeof(msg.text) === "undefined") { return; }
    global.MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("meteor");
        dbo.collection(collection).find({}).toArray((err, result) => {
            result.forEach(function(element) {
                msg_txt = msg.text.toString().toLowerCase();
                element_txt = element.tag.toString().toLowerCase();
                if (msg_txt.includes(element_txt)) {
                    bot.sendMessage(msg.chat.id, element.reply );
                }
            });
            db.close();
        });
    });
}


bot.on('message', (msg) => {
  getTag("tags",msg);
})
