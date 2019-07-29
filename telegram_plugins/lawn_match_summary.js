     


var lawngetSummary = function(collection, msg) {
if ( !config.check_chats(msg.chat.id) ) { return; }
    var url = "mongodb://localhost:3001/meteor";
    var xx =  {};
    if (typeof(msg.text) === "undefined") { return; }
    msg_txt = msg.text.toString().toLowerCase();
    if (msg_txt.includes("lawn summary")) {



    global.MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("meteor");
        dbo.collection(collection).find({}).toArray((err, result) => {
            var maxscore = function(drives_played,total_drives,ntos,score) {
                return parseInt(score) + ((Math.abs(total_drives-drives_played) + parseInt(ntos)) * 8)
            };
            var clinchCalc = function(lawnScore ,totalDrives, lawnoppDrives,lawnoppNTO,lawnoppScore) {
                return  (parseInt(lawnoppScore) + ((Math.abs(totalDrives -lawnoppDrives) + parseInt(lawnoppNTO)) * 8)) - lawnScore + 1;
            };
            var  matchdiffCalc = function(totalDrives,lawnDrives,lawnNTO,lawnScore,lawnoppDrives,lawnoppNTO,lawnoppScore) {

                 return (parseInt(lawnScore) + ((Math.abs(totalDrives -lawnDrives) + parseInt(lawnNTO)) * 8)) - (parseInt(lawnoppScore) + ((Math.abs(totalDrives -lawnoppDrives) + parseInt(lawnoppNTO)) * 8))  ;
            };
            var ppdCalc = function(score,total_drives) {
                return parseFloat(score) / parseFloat(total_drives);
        
            }
            data = result[0] ;
            totalDrives = result[0].totalDrives;
            lawnScore = result[0].lawnScore;
            lawnDrives = result[0].lawnDrives;
            lawnNTO  = result[0].lawnNTO;
            lawnoppScore = result[0].lawnoppScore;
            lawnoppDrives = result[0].lawnoppDrives;
            lawnoppNTO = result[0].lawnoppNTO;
            
            lawnMaxScore = maxscore(lawnDrives,totalDrives,lawnNTO,lawnScore); 
            lawnoppMaxScore = maxscore(lawnoppDrives,totalDrives,lawnoppNTO,lawnoppScore); 

            lawnPPD = ppdCalc(lawnScore,lawnDrives).toFixed(2);
            lawnoppPPD = ppdCalc(lawnoppScore,lawnoppDrives).toFixed(2);

            clinch = clinchCalc(lawnScore ,totalDrives, lawnoppDrives,lawnoppNTO,lawnoppScore);
            matchdiff = matchdiffCalc(totalDrives,lawnDrives,lawnNTO,lawnScore,lawnoppDrives,lawnoppNTO,lawnoppScore);
var output = `*Current Match Status* 
*LAWN:* ` + lawnScore +` (PPD: `+lawnPPD+`) - `+ lawnDrives +`/` +totalDrives+ ` (NTO:`+lawnNTO+`)
*OPP:*   ` + lawnoppScore +` (PPD: `+lawnoppPPD+`) - `+ lawnoppDrives +`/` +totalDrives+ ` (NTO:`+lawnoppNTO+`)
  
*LAWN MaxScore:* `+lawnMaxScore+` 
*OPP   MaxScore:* `+lawnoppMaxScore+`

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
  lawngetSummary("lawnscores",msg);
})
  
