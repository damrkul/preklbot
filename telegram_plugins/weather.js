  
var WeatherCheck = function(msg) { 
console.log("HEHE");
  
if (typeof(msg.text) === "undefined") { return; }
msg_txt = msg.text.toString().toLowerCase();
if (!msg_txt.includes("!weather ")) { return; }

msg_txt = msg_txt.replace("!weather " , "" );
try { 
parseInt(msg_txt);
} catch(err) { 
 return;
}
OWM_APPID="5663ee54c821744380f31c440462ed6c";
OWM_URL   = 'http://api.openweathermap.org/data/2.5/weather';

url= OWM_URL + "?" + "appid=" + OWM_APPID + "&units=imperial" + "&zip=" +msg_txt;

//http://api.openweathermap.org/data/2.5/weather?appid=5663ee54c821744380f31c440462ed6c&units=imperial&zip=54701
//http://api.openweathermap.org/data/2.5/weather?appid=5663ee54c821744380f31c440462ed6c&units=imperial&zip=54701

global.Request(url, function(err, res, body) {  
    console.log(JSON.parse(body));
    data = JSON.parse(body);
try {
   temp = data['main']['temp'];
   humid = data['main']['humidity'];
   city = data['name'];
   desc = data['weather'][0]['description'];
   reply = "Current Weather for " + city + ": "  +desc +  "  Temp("+ temp+ ") Humidity(" + humid +")" ; 
    bot.sendMessage(msg.chat.id, reply );
} catch(err) {}



});
};
bot.on('message', (msg) => {
  WeatherCheck(msg);
})
