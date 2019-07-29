     


var getSummary = function(collection, msg) {
if ( !config.check_chats(msg.chat.id) ) { return; }
    var url = "mongodb://localhost:3001/meteor";
    var xx =  {};
    if (typeof(msg.text) === "undefined") { return; }
    msg_txt = msg.text.toString().toLowerCase();
    if (msg_txt.includes("match summary")) {



    global.MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("meteor");
        dbo.collection(collection).find({}).toArray((err, result) => {
            var maxscore = function(drives_played,total_drives,ntos,score) {
                return parseInt(score) + ((Math.abs(total_drives-drives_played) + parseInt(ntos)) * 8)
            };
            var clinchCalc = function(pwwScore ,totalDrives, oppDrives,oppNTO,oppScore) {
                return  (parseInt(oppScore) + ((Math.abs(totalDrives -oppDrives) + parseInt(oppNTO)) * 8)) - pwwScore + 1;
            };
            var  matchdiffCalc = function(totalDrives,pwwDrives,pwwNTO,pwwScore,oppDrives,oppNTO,oppScore) {

                 return (parseInt(pwwScore) + ((Math.abs(totalDrives -pwwDrives) + parseInt(pwwNTO)) * 8)) - (parseInt(oppScore) + ((Math.abs(totalDrives -oppDrives) + parseInt(oppNTO)) * 8))  ;
            };
            var ppdCalc = function(score,total_drives) {
                return parseFloat(score) / parseFloat(total_drives);
        
            }
            data = result[0] ;
            totalDrives = result[0].totalDrives;
            pwwScore = result[0].pwwScore;
            pwwDrives = result[0].pwwDrives;
            pwwNTO  = result[0].pwwNTO;
            oppScore = result[0].oppScore;
            oppDrives = result[0].oppDrives;
            oppNTO = result[0].oppNTO;
            
            pwwMaxScore = maxscore(pwwDrives,totalDrives,pwwNTO,pwwScore); 
            oppMaxScore = maxscore(oppDrives,totalDrives,oppNTO,oppScore); 

            pwwPPD = ppdCalc(pwwScore,pwwDrives).toFixed(2);
            oppPPD = ppdCalc(oppScore,oppDrives).toFixed(2);

            clinch = clinchCalc(pwwScore ,totalDrives, oppDrives,oppNTO,oppScore);
            matchdiff = matchdiffCalc(totalDrives,pwwDrives,pwwNTO,pwwScore,oppDrives,oppNTO,oppScore);
var output = `*Current Match Status* 
*PWW:* ` + pwwScore +` (PPD: `+pwwPPD+`) - `+ pwwDrives +`/` +totalDrives+ ` (NTO:`+pwwNTO+`)
*OPP:*   ` + oppScore +` (PPD: `+oppPPD+`) - `+ oppDrives +`/` +totalDrives+ ` (NTO:`+oppNTO+`)
  
*PWW MaxScore:* `+pwwMaxScore+` 
*OPP   MaxScore:* `+oppMaxScore+`

*Score Difference:* `+ matchdiff +` 
*Points to Clinch:* `+ clinch +`


`;
                    bot.sendMessage(msg.chat.id, output , {parse_mode : "markdown"});
        //    db.close();
        });

    });














    }
}


bot.on('message', (msg) => {
  getSummary("scores",msg);
})
  
