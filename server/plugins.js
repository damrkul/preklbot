const fs = require('fs');
const path = require('path')

telegram_plugin_dir = process.env.PWD + "/telegram_plugins";

const folderPath = telegram_plugin_dir;

fs.readdirSync(folderPath)

const isFile = fileName => {
  return fs.lstatSync(fileName).isFile()
}




files = fs.readdirSync(folderPath);

//files = fs.readdirSync(telegram_plugin_dir).map(fileName =>  {  return path.join(telegram_plugin_dir), fileName);

plugins = [];

console.log(files);
for ( var i = 0; i < files.length; i++ ) { 
    if (files[i].includes(".js" ) === false) { continue; } 
    data = fs.readFileSync(telegram_plugin_dir + "/" + files[i], 'utf8') ; 
    //console.log(data);
   // eval(data);
    plugins.push(data);
}

console.log(plugins);
module.exports = plugins;
