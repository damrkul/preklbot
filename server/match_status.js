

scores = new Meteor.Collection('scores');
scores.allow({
  remove: function() { return true; },
  update: function() { return true; }
});


pwwHolds = new Meteor.Collection('pwwHolds');
pwwHolds.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

pwwTDs = new Meteor.Collection('pwwTDs');
pwwTDs.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

oppHolds = new Meteor.Collection('oppHolds');
oppHolds.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

oppTDs = new Meteor.Collection('oppTDs');
oppTDs.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

Meteor.methods({
  addPWWHolds: function(player) {
    return pwwHolds.insert({
      'name': "",
      'drive': "1",
      'down': "1st",
      'yards': "0",
      'fgRange': false
  });
  },

  addPWWTDs: function(title) {
    return pwwTDs.insert({
      'name': ""
    });
  },

  addOPPHolds: function(player) {
    return oppHolds.insert({
      'name': "",
      'drive': "1",
      'down': "1st",
      'yards': "0",
      'fgRange': false
    });
  },

  addOPPTDs: function(title) {
    return oppTDs.insert({
      'name': ""
    });
  }
});

if(Meteor.isServer) {


 // Listen to incoming HTTP requests (can only be used on the server).
  // Add Score Data
  Meteor.startup(function () {
    // Insert sample data if the scores collection is empty
    if (scores.find().count() === 0) {
      var scoreDoc = { "_id": "1", 
              "totalDrives": "",
              "pwwScore": "",
              "pwwDrives": "",
              "pwwNTO": "",
              "oppScore": "",
              "oppDrives": "",
              "oppNTO":"",
              "pwwMaxScore": "4",
               "oppMaxScore": "",
               };
      scores.insert(scoreDoc);
    
    }



  });



  Meteor.publish('scores', function() {
    return scores.find();
  });

  Meteor.publish('pwwHolds', function() {
    return pwwHolds.find();
  });

  Meteor.publish('oppHolds', function() {
    return oppHolds.find();
  });


  Meteor.publish('pwwTDs', function() {
    return pwwTDs.find();
  });

  Meteor.publish('oppTDs', function() {
    return oppTDs.find();
  });
}

