

r1scores = new Meteor.Collection('r1scores');
r1scores.allow({
  remove: function() { return true; },
  update: function() { return true; }
});


r1Holds = new Meteor.Collection('r1Holds');
r1Holds.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

r1TDs = new Meteor.Collection('r1TDs');
r1TDs.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

r1oppHolds = new Meteor.Collection('r1oppHolds');
r1oppHolds.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

r1oppTDs = new Meteor.Collection('r1oppTDs');
r1oppTDs.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

Meteor.methods({
  addR1Holds: function(player) {
    return r1Holds.insert({
      'name': "",
      'drive': "1",
      'down': "1st",
      'yards': "0",
      'fgRange': false
  });
  },

  addR1TDs: function(title) {
    return r1TDs.insert({
      'name': ""
    });
  },

  addR1OPPHolds: function(player) {
    return r1oppHolds.insert({
      'name': "",
      'drive': "1",
      'down': "1st",
      'yards': "0",
      'fgRange': false
    });
  },

  addR1OPPTDs: function(title) {
    return r1oppTDs.insert({
      'name': ""
    });
  }
});

if(Meteor.isServer) {


 // Listen to incoming HTTP requests (can only be used on the server).
  // Add Score Data
  Meteor.startup(function () {
    // Insert sample data if the r1scores collection is empty
    if (r1scores.find().count() === 0) {
      var scoreDoc = { "_id": "1", 
              "totalDrives": "",
              "r1Score": "",
              "r1Drives": "",
              "r1NTO": "",
              "r1oppScore": "",
              "r1oppDrives": "",
              "r1oppNTO":"",
              "r1MaxScore": "4",
               "r1oppMaxScore": "",
               };
      r1scores.insert(scoreDoc);
    
    }



  });



  Meteor.publish('r1scores', function() {
    return r1scores.find();
  });

  Meteor.publish('r1Holds', function() {
    return r1Holds.find();
  });

  Meteor.publish('r1oppHolds', function() {
    return r1oppHolds.find();
  });


  Meteor.publish('r1TDs', function() {
    return r1TDs.find();
  });

  Meteor.publish('r1oppTDs', function() {
    return r1oppTDs.find();
  });
}

