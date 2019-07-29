
var config =  { 
    "token": "733433420:AAE7TIy9oiVEJ-mTXjqmK_5lKnfJ5KyA_no",
    "chat_ids": ["-353221350", "-204395009","-1001233322512", "-383921851", "-1001265669127", "-284541282", "-1001300385395", "642920943"],
    
    check_chats: function(chat_id) { return this.chat_ids.includes(String(chat_id)); }
}
module.exports = config;
