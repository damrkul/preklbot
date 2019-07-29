     


var r1getSummary = function(collection, msg) {
if ( !config.check_chats(msg.chat.id) ) { return; }
    var url = "mongodb://localhost:3001/meteor";
    var xx =  {};
    if (typeof(msg.text) === "undefined") { return; }
    msg_txt = msg.text.toString().toLowerCase();
    if (msg_txt.includes("r1 summary")) {



    global.MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("meteor");
        dbo.collection(collection).find({}).toArray((err, result) => {
            var maxscore = function(drives_played,total_drives,ntos,score) {
                return parseInt(score) + ((Math.abs(total_drives-drives_played) + parseInt(ntos)) * 8)
            };
            var clinchCalc = function(r1Score ,totalDrives, r1oppDrives,r1oppNTO,r1oppScore) {
                return  (parseInt(r1oppScore) + ((Math.abs(totalDrives -r1oppDrives) + parseInt(r1oppNTO)) * 8)) - r1Score + 1;
            };
            var  matchdiffCalc = function(totalDrives,r1Drives,r1NTO,r1Score,r1oppDrives,r1oppNTO,r1oppScore) {

                 return (parseInt(r1Score) + ((Math.abs(totalDrives -r1Drives) + parseInt(r1NTO)) * 8)) - (parseInt(r1oppScore) + ((Math.abs(totalDrives -r1oppDrives) + parseInt(r1oppNTO)) * 8))  ;
            };
            var ppdCalc = function(score,total_drives) {
                return parseFloat(score) / parseFloat(total_drives);
        
            }
            data = result[0] ;
            totalDrives = result[0].totalDrives;
            r1Score = result[0].r1Score;
            r1Drives = result[0].r1Drives;
            r1NTO  = result[0].r1NTO;
            r1oppScore = result[0].r1oppScore;
            r1oppDrives = result[0].r1oppDrives;
            r1oppNTO = result[0].r1oppNTO;
            
            r1MaxScore = maxscore(r1Drives,totalDrives,r1NTO,r1Score); 
            r1oppMaxScore = maxscore(r1oppDrives,totalDrives,r1oppNTO,r1oppScore); 

            r1PPD = ppdCalc(r1Score,r1Drives).toFixed(2);
            r1oppPPD = ppdCalc(r1oppScore,r1oppDrives).toFixed(2);

            clinch = clinchCalc(r1Score ,totalDrives, r1oppDrives,r1oppNTO,r1oppScore);
            matchdiff = matchdiffCalc(totalDrives,r1Drives,r1NTO,r1Score,r1oppDrives,r1oppNTO,r1oppScore);
var output = `*Current Match Status* 
*R1:* ` + r1Score +` (PPD: `+r1PPD+`) - `+ r1Drives +`/` +totalDrives+ ` (NTO:`+r1NTO+`)
*OPP:*   ` + r1oppScore +` (PPD: `+r1oppPPD+`) - `+ r1oppDrives +`/` +totalDrives+ ` (NTO:`+r1oppNTO+`)
  
*R1 MaxScore:* `+r1MaxScore+` 
*OPP   MaxScore:* `+r1oppMaxScore+`

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
  r1getSummary("r1scores",msg);
})
  
