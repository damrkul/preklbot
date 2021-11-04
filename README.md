## preklbot


Preklbot is a Web-Managed Telegram Bot.   This allows multiple users to manage settings of a ChatBot via Website.    Users can go in and create their own custom chat triggers via the website.   No Programming/Reloading needed.

This also was designed using a Plugin-Architechture so writing plugins for the bot is very easy as well.




**Installation:**

``` 
git clone https://github.com/damrkul/preklbot.git

cd preklbot

meteor npm install mongodb --save
meteor npm install node-telegram-bot-api --save


```


## Find your Telegram Bot Auth Token via BotFather
- Edit server/config.js
```

var config =  { 
    "token": "REPLACE_WITH_YOUR_BOT_TOKEN" 
}
module.exports = config;
```


## After you have edited your token, simply start the bot

```
meteor
```


Your bot should be ready to use, you can go to http://localhost:3000 in your browser and add custom phrases/auto replies.



