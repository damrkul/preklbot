const play_data = new Meteor.Collection('play_data');
/*
play_data.allow({
  remove: function() { return true; },
  update: function() { return true; },
  insert: function() { return true; },
});
*/
    // Insert sample data if the scores collection is empty
if (play_data.find().count() === 0) {
    var off_play = { "_id": "1-1",
              "off_play": "1",
              "def_play": "1",
              "data": "",
               };
    play_data.insert(off_play);
}




Meteor.publish('play_data', function() {
    return play_data.find();
});
