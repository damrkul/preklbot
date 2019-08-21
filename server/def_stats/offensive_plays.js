const offensive_plays = new Meteor.Collection('offensive_plays');

offensive_plays.allow({
  remove: function() { return true; },
  update: function() { return true; },
});

    // Insert sample data if the scores collection is empty
if (offensive_plays.find().count() === 0) {
    var off_play = { "_id": "1",
              "off_play": "HB Blast",
              "type": "Run",
              "scheme": "Vertical",
              "coach": "Core Scheme",
               };
    offensive_plays.insert(off_play);
}



Meteor.methods({
  addOffensivePlay: function(player) {
    return offensive_plays.insert({
      'off_play': "RenameThisPlay",
       "type": "Run",
      'scheme': "West Coast",
              "coach": "Core Scheme",
    });   
  },
});

Meteor.publish('offensive_plays', function() {
    return offensive_plays.find();
});
