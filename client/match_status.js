

scores = new Meteor.Collection('scores');
pwwHolds = new Meteor.Collection('pwwHolds');
pwwTDs = new Meteor.Collection('pwwTDs');
oppHolds = new Meteor.Collection('oppHolds');
oppTDs = new Meteor.Collection('oppTDs');

  Meteor.subscribe('scores');
  Meteor.subscribe('pwwHolds');
  Meteor.subscribe('oppHolds');
  Meteor.subscribe('pwwTDs');
  Meteor.subscribe('oppTDs');

  Template.pwwHeld.events({

    'click #addPWWHolds': function () {
        Meteor.call('addPWWHolds', null);
    },

    'keyup .playername ': function(e){
     pwwHolds.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'change .drive ': function(e){
     pwwHolds.update({_id: this._id}, {$set: { drive: $(e.target).val()}});
    },
    'change .down ': function(e){
     pwwHolds.update({_id: this._id}, {$set: { down: $(e.target).val()}});
    },

    'change .fgrange ': function(e){
     pwwHolds.update({_id: this._id}, {$set: { fgRange: $(e.target).is(':checked')}});
    },
    'keyup .yards ': function(e){
     pwwHolds.update({_id: this._id}, {$set: { yards: $(e.target).val()}});
    },

    'click .delete-pwwHold': function () {
      pwwHolds.remove(this._id);
    },
  });




  Template.oppHeld.events({

    'click #addOPPHolds': function () {
        Meteor.call('addOPPHolds', null);
    },

    'keyup .playername ': function(e){
     oppHolds.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'change .drive ': function(e){
     oppHolds.update({_id: this._id}, {$set: { drive: $(e.target).val()}});
    },
    'change .down ': function(e){
     oppHolds.update({_id: this._id}, {$set: { down: $(e.target).val()}});
    },

    'change .fgrange ': function(e){
     oppHolds.update({_id: this._id}, {$set: { fgRange: $(e.target).is(':checked')}});
    },
    'keyup .yards ': function(e){
     oppHolds.update({_id: this._id}, {$set: { yards: $(e.target).val()}});
    },

    'click .delete-pwwHold': function () {
      oppHolds.remove(this._id);
    },
  });


  Template.pwwTDs.events({

    'click .addplayer': function () {
        Meteor.call('addPWWTDs', null);
    },

    'keyup .playername ': function(e){
     pwwTDs.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'click .delete': function () {
      pwwTDs.remove(this._id);
    },
  });




  Template.oppTDs.events({

    'click .addplayer': function () {
        Meteor.call('addOPPTDs', null);
    },

    'keyup .playername ': function(e){
     oppTDs.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'click .delete': function () {
      oppTDs.remove(this._id);
    },
  });


/*
    var maxscores = function(drives_played,total_drives,ntos,score) {
        return parseInt(score) + ((Math.abs(total_drives-drives_played) - ntos) * 8);
    }
*/
  Template.scores.events({

    'keyup .totalDrives ': function(e){
     scores.update({_id: this._id}, {$set: { totalDrives: $(e.target).val()}});
    },


    'keyup .pwwScore ': function(e){
     scores.update({_id: this._id}, {$set: { pwwScore: $(e.target).val()}});
     score = scores.findOne({ _id: this._id });

   //  maxscore = maxscores(score.pwwDrives, score.totalDrives,score.pwwNTO,score.pwwScore);
   //  scores.update({_id: this._id}, {$set: { pwwMaxScore: maxscore }});


    },

    'keyup .pwwDrives ': function(e){
     scores.update({_id: this._id}, {$set: { pwwDrives: $(e.target).val()}});
    },
    'keyup .pwwNTO ': function(e){
     scores.update({_id: this._id}, {$set: { pwwNTO: $(e.target).val()}});
    },

    'keyup .oppScore ': function(e){
     scores.update({_id: this._id}, {$set: { oppScore: $(e.target).val()}});
    },

    'keyup .oppDrives ': function(e){
     scores.update({_id: this._id}, {$set: { oppDrives: $(e.target).val()}});
    },
    'keyup .oppNTO ': function(e){
     scores.update({_id: this._id}, {$set: { oppNTO: $(e.target).val()}});
    },

  });




  Template.scores.scoresList = function(){
    return scores.find();
  }
  Template.pwwHeld.pwwHoldList = function(){
    return pwwHolds.find();
  }

  Template.oppHeld.oppHoldList = function(){
    return oppHolds.find();
  }
  Template.pwwTDs.pwwTDsList = function(){
    return pwwTDs.find();
  }

  Template.oppTDs.oppTDsList = function(){
    return oppTDs.find();
  }




  Template.downMenu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  })


  Template.scores.helpers({
    equals: function(a, b) {
        return a == b;
    },
    maxscore: function(drives_played,total_drives,ntos,score) {
      // return Math.abs(total_drives-drives_played) - ntos) * 8) + score;
       return parseInt(score) + ((Math.abs(total_drives-drives_played) - ntos) * 8)
    },

    matchdiff: function(totalDrives,pwwDrives,pwwNTO,pwwScore,oppDrives,oppNTO,oppScore) {

     return (parseInt(pwwScore) + ((Math.abs(totalDrives -pwwDrives) - pwwNTO) * 8)) - (parseInt(oppScore) + ((Math.abs(totalDrives -oppDrives) - oppNTO) * 8))  ;
    },

     clinch: function(pwwScore ,totalDrives, oppDrives,oppNTO,oppScore) {

     return  (parseInt(oppScore) + ((Math.abs(totalDrives -oppDrives) - oppNTO) * 8)) - pwwScore + 1;
    },



  })


  Template.driveMenu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  })
  Template.fgRangeMenu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  })

