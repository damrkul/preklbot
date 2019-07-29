

lawnscores = new Meteor.Collection('lawnscores');
lawnscores.allow({
  remove: function() { return true; },
  update: function() { return true; }
});


lawnHolds = new Meteor.Collection('lawnHolds');
lawnHolds.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

lawnTDs = new Meteor.Collection('lawnTDs');
lawnTDs.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

lawnoppHolds = new Meteor.Collection('lawnoppHolds');
lawnoppHolds.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

lawnoppTDs = new Meteor.Collection('lawnoppTDs');
lawnoppTDs.allow({
  remove: function() { return true; },
  update: function() { return true; }
});

Meteor.methods({
  addLAWNHolds: function(player) {
    return lawnHolds.insert({
      'name': "",
      'drive': "1",
      'down': "1st",
      'yards': "0",
      'fgRange': false
  });
  },

  addLAWNTDs: function(title) {
    return lawnTDs.insert({
      'name': ""
    });
  },

  addLAWNOPPHolds: function(player) {
    return lawnoppHolds.insert({
      'name': "",
      'drive': "1",
      'down': "1st",
      'yards': "0",
      'fgRange': false
    });
  },

  addLAWNOPPTDs: function(title) {
    return lawnoppTDs.insert({
      'name': ""
    });
  }
});

if(Meteor.isServer) {


 // Listen to incoming HTTP requests (can only be used on the server).
  // Add Score Data
  Meteor.startup(function () {
    // Insert sample data if the lawnscores collection is empty
    if (lawnscores.find().count() === 0) {
      var scoreDoc = { "_id": "1", 
              "totalDrives": "",
              "lawnScore": "",
              "lawnDrives": "",
              "lawnNTO": "",
              "lawnoppScore": "",
              "lawnoppDrives": "",
              "lawnoppNTO":"",
              "lawnMaxScore": "4",
               "lawnoppMaxScore": "",
               };
      lawnscores.insert(scoreDoc);
    
    }



  });



  Meteor.publish('lawnscores', function() {
    return lawnscores.find();
  });

  Meteor.publish('lawnHolds', function() {
    return lawnHolds.find();
  });

  Meteor.publish('lawnoppHolds', function() {
    return lawnoppHolds.find();
  });


  Meteor.publish('lawnTDs', function() {
    return lawnTDs.find();
  });

  Meteor.publish('lawnoppTDs', function() {
    return lawnoppTDs.find();
  });
}

