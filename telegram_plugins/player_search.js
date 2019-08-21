    

function GetSortOrder(prop,prop2) {
    if (prop2 != undefined) {
        return function(a,b) {  
              const propC1 = b[prop].localeCompare(a[prop]);
              const propC2 = b[prop2].localeCompare(a[prop2]);
              return propC1 || propC2;


        }

    }
    
    
    return function(a, b) {
        if (a[prop] < b[prop]) {
            return 1;
        } else if (a[prop] > b[prop]) {
            return -1;
        }
        return 0;
    }
}
var PlayerSearch = function(msg) { 

var player_search_dir="/var/www/rekous/cms/assets/player_search";

if ( !config.check_chats(msg.chat.id) ) { return; }

  
if (typeof(msg.text) === "undefined") { return; }
if (!msg_txt.includes("!playersearch ")) { return; }
console.log("RUNNING PALYER SERACH");
//msg_txt = msg_txt.replace("!playersearch " , "" );

searchString = msg.text.trim().replace("!playersearch ", "");
txt = searchString.split(" ");

search_type = txt[0];
search_criteria = txt[1];



url = player_search.get_url(search_type, search_criteria) ;

attr = player_search.get_attributes(search_type, search_criteria);

console.log(url);

var timestamp = Date.now();
global.scraper
  .get(url)
  //.get('https://root-tools.xyz/display-players.php?program=Signature')
  .then(function(tableData) {
    var thead = "";
    var tbody = "";
    var data = tableData[9];
    sortby = "OVR";
    sortby2 = "CreationDate";
    
    if (player_search.hasSortKeys(searchString) )   {
        sort_keys = player_search.get_sortkeys(searchString);
        sortby = sort_keys[0] || "OVR";
        sortby2 = sort_keys[1] || "CreationDate";
    }
    if (data[0]["0"] == undefined ) {  
      attr = player_search.transform(attr);
      sortby = player_search.transform_sort(sortby);
      sortby2 = player_search.transform_sort(sortby2);
    } 
    
    data = data.sort(GetSortOrder(sortby,sortby2)); 

    thead="<thead><tr>"
    attr.forEach( key => thead += "<th>" + key.replace("*","").replace("_2","").replace("_","")  + "</th>" );
    thead +="</thead>";


    tbody +="<tbody>";
    for (var i=0;i<data.length;i++) {
        player = data[i];
        var row = "<tr>";
        attr.forEach( key =>  (player.hasOwnProperty(key)) ? row+="<td>" + player[key]  +"</td>" : '' );
        row += "</tr>";
        tbody += row;
    }

    tbody += "</tbody>";


var html  =`
<html>


    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">

    <script src="http://www.rekous.com/js/bootstrap.min.js"></script>


<body>

<center>
<br>

<table class="table table-bordered table-striped">

`;


//search_criteria = search_criteria || "";
html +="<h3>" + search_type + " " + ( search_criteria || "" )  + " sortby=" + sortby.replace("*","").replace("_2","").replace("_","") + "," + sortby2.replace("*","").replace("_2","").replace("_","") + "</h3>"; 
html += thead;
html += tbody;


html +=`
</table>

</body>
</html>
`;

var fs = require("fs");

fs.writeFileSync(player_search_dir +"/player_search_"+timestamp+".html", html, (err) => {
  if (err) console.log(err);
});

});


    bot.sendMessage(msg.chat.id, "Creating Image..please wait 10 seconds.." );


//constexec = require('child_process').exec;
/*var yourscript = global.execSync("xvfb-run --server-args='-screen 0, 1920x1080x24' /var/www/rekous/site/slack/player_search/create_pic/webkit2png.py -o "+ player_search_dir + "/player_search_"+timestamp+".png http://cms.rekous.com/assets/player_search/player_search_"+timestamp+".html",
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        bot.sendMessage(msg.chat.id, "http://cms.rekous.com/assets/player_search/player_search_"+timestamp+".png" );
        });
*/
//global.execSync("xvfb-run --server-args='-screen 0, 1920x1080x24' /var/www/rekous/site/slack/player_search/create_pic/webkit2png.py -o "+ player_search_dir + "/player_search_"+timestamp+".png http://cms.rekous.com/assets/player_search/player_search_"+timestamp+".html");

console.log("xvfb-run --server-args='-screen 0, 1920x1080x24' /var/www/rekous/site/slack/player_search/create_pic/webkit2png.py -o "+ player_search_dir + "/player_search_"+timestamp+".png http://cms.rekous.com/assets/player_search/player_search_"+timestamp+".html");




const { exec } = require('child_process');
exec("sleep 10;xvfb-run --server-args='-screen 0, 1920x1080x24' /var/www/rekous/site/slack/player_search/create_pic/webkit2png.py -o "+ player_search_dir + "/player_search_"+timestamp+".png http://cms.rekous.com/assets/player_search/player_search_"+timestamp+".html", (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
    console.log("SENDING");
    bot.sendMessage(msg.chat.id, "http://cms.rekous.com/assets/player_search/player_search_"+timestamp+".png" )
  }
});








//bot.sendMessage(msg.chat.id, "http://cms.rekous.com/assets/player_search/player_search_"+timestamp+".png" );

};
bot.on('message', (msg) => {
  PlayerSearch(msg);
})
