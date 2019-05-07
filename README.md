## preklbot



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



