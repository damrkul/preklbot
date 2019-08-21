const defensive_plays = new Meteor.Collection('defensive_plays');

defensive_plays.allow({
  remove: function() { return true; },
  update: function() { return true; },
});

    // Insert sample data if the scores collection is empty
if (defensive_plays.find().count() === 0) {
    var def_play = { "_id": "1",
              "def_play": "3 Double Sky",
              "type": "Zone",
              "formation": "Dime",
              "blitz": false
               };
    defensive_plays.insert(def_play);
}



Meteor.methods({
  addDefensivePlay: function(play) {
    return defensive_plays.insert({
      'def_play': "RenameThisPlay",
      "type":  "Zone",
      "formation": "Dime",
      "blitz": false,
    });
  },
});

Meteor.publish('defensive_plays', function() {
    return defensive_plays.find();
});
