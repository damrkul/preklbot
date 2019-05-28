

var LeetSpeak = function(msg) { 


if (typeof(msg.text) === "undefined") { return; }
msg_txt = msg.text.toString().toLowerCase();
if (!msg_txt.includes("!leet ")) { return; }

msg_txt = msg_txt.replace("!leet " , "" );


_A = [ '4',  '@'];
_C = [ '(', '<'];
_E = [ '3'];
_L = [ '1', '|'];
_O = [ '0', '()'];
_S = ['5', '$', 'z'];
_T = [ '+', '7'];

_a = _A[Math.floor(Math.random() * _A.length)]; 
_c = _C[Math.floor(Math.random() * _C.length)]; 
_e = _E[Math.floor(Math.random() * _E.length)]; 
_l = _L[Math.floor(Math.random() * _L.length)]; 
_o = _O[Math.floor(Math.random() * _O.length)]; 
_s = _S[Math.floor(Math.random() * _S.length)]; 
_t = _T[Math.floor(Math.random() * _T.length)]; 


reply = msg_txt.trim().toLowerCase().replace(/a/g, _a).replace(/c/g, _c).replace(/a/g,_e).replace(/l/g,_l).replace(/o/g,_o).replace(/s/g,_s).replace(/t/g, _t).replace(/e/g,_e);
   
bot.sendMessage(msg.chat.id, reply );

};
bot.on('message', (msg) => {
  LeetSpeak(msg);
})
