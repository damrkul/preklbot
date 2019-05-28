const fs = require('fs');
const path = require('path')

telegram_plugin_dir = process.env.PWD + "/telegram_plugins";

const folderPath = telegram_plugin_dir;

fs.readdirSync(folderPath)

const isFile = fileName => {
  return fs.lstatSync(fileName).isFile()
}

files = fs.readdirSync(folderPath);

plugins = [];

for ( var i = 0; i < files.length; i++ ) { 
    if (files[i].includes(".js" ) === false) { continue; } 
    data = fs.readFileSync(telegram_plugin_dir + "/" + files[i], 'utf8') ; 
    plugins.push(data);
    console.log("Loading " + files[i] + " ..." );
}

module.exports = plugins;
