
var getLC = function(collection, msg) {
if ( !config.check_chats(msg.chat.id) ) { return; }



if (typeof(msg.text) === "undefined") { return; }
msg_txt = msg.text.toString().toLowerCase();
if (!msg_txt.includes("!lc ")) { return; }

console.log("TEST");
msg_txt = msg_txt.replace("!lc " , "" );
var regex = new RegExp(["^", msg_txt, "$"].join(""), "i");
var regex = new RegExp([".*", msg_txt , ".*"].join(""), "i");

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
        dbo.collection("offensive_plays").find({ off_play: regex }).toArray((err, result) => {
            var answer = [];
            //console.log(result);

            result.forEach(function(element) {
                 bot.sendMessage(msg.chat.id, element.off_play );
            ///
            var answer = [];
            answer.push(element.off_play);
           // console.log(element._id);
            global.MongoClient.connect(url,{ useNewUrlParser: true }, function(err2, db2) {
                var dbo2 = db2.db("meteor");
                dbo2.collection("play_data").find({ off_play: "CDQiLEufHeiv28hsy" ,  avg: { $ne: NaN }  }, { sort: { avg: 1 } }).toArray((err2, result2) => {    
                //console.log(result2);

                result2.forEach(function(item,index)  {
                    global.MongoClient.connect(url,{ useNewUrlParser: true }, function(err3, db3) {
                        var dbo3 = db3.db("meteor");     
                         dbo3.collection("defensive_plays").findOne({ _id: item.def_play  }).then(function(d_play_data) { 
                            answer.push( d_play_data.formation + " - " + d_play_data.def_play + ": " + item.avg );
                         });
                        console.log(answer);
                     });
                });
           

        });
    });
        ////    
            });
        });
            db.close();
    });
}


bot.on('message', (msg) => {
  getLC("offensive_plays",msg);
})
