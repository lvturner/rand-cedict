var fs = require('fs');
var sqlite3 = require('sqlite3');
var notifier = require('node-notifier');

function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

var db = new sqlite3.Database(getUserHome() + "/cedict/cedict.sqlite3");

db.each("SELECT * FROM dict WHERE docid = (abs(random()) % (SELECT max(docid)+1 from dict));", function(err, entry) {
  var english = "";
  var englishArray = entry["english"].split('/');
  for(var i in englishArray) {
    english += (parseInt(i) + 1) + ". " + englishArray[i] + "\n";
  }
  notifier.notify({ 
    title: entry["simplified"],
    subtitle: entry["pinyin"],
    message: english
  });
});
