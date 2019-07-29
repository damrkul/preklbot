

r1scores = new Meteor.Collection('r1scores');
r1Holds = new Meteor.Collection('r1Holds');
r1TDs = new Meteor.Collection('r1TDs');
r1oppHolds = new Meteor.Collection('r1oppHolds');
r1oppTDs = new Meteor.Collection('r1oppTDs');

  Meteor.subscribe('r1scores');
  Meteor.subscribe('r1Holds');
  Meteor.subscribe('r1oppHolds');
  Meteor.subscribe('r1TDs');
  Meteor.subscribe('r1oppTDs');

  Template.r1Held.events({

    'click #addR1Holds': function () {
        Meteor.call('addR1Holds', null);
    },

    'keyup .playername ': function(e){
     r1Holds.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'change .drive ': function(e){
     r1Holds.update({_id: this._id}, {$set: { drive: $(e.target).val()}});
    },
    'change .down ': function(e){
     r1Holds.update({_id: this._id}, {$set: { down: $(e.target).val()}});
    },

    'change .fgrange ': function(e){
     r1Holds.update({_id: this._id}, {$set: { fgRange: $(e.target).is(':checked')}});
    },
    'keyup .yards ': function(e){
     r1Holds.update({_id: this._id}, {$set: { yards: $(e.target).val()}});
    },

    'click .delete-r1Hold': function () {
      r1Holds.remove(this._id);
    },
  });




  Template.r1oppHeld.events({

    'click #addR1OPPHolds': function () {
        Meteor.call('addR1OPPHolds', null);
    },

    'keyup .playername ': function(e){
     r1oppHolds.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'change .drive ': function(e){
     r1oppHolds.update({_id: this._id}, {$set: { drive: $(e.target).val()}});
    },
    'change .down ': function(e){
     r1oppHolds.update({_id: this._id}, {$set: { down: $(e.target).val()}});
    },

    'change .fgrange ': function(e){
     r1oppHolds.update({_id: this._id}, {$set: { fgRange: $(e.target).is(':checked')}});
    },
    'keyup .yards ': function(e){
     r1oppHolds.update({_id: this._id}, {$set: { yards: $(e.target).val()}});
    },

    'click .delete-r1Hold': function () {
      r1oppHolds.remove(this._id);
    },
  });


  Template.r1TDs.events({

    'click .addplayer': function () {
        Meteor.call('addR1TDs', null);
    },

    'keyup .playername ': function(e){
     r1TDs.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'click .delete': function () {
      r1TDs.remove(this._id);
    },
  });




  Template.r1oppTDs.events({

    'click .addplayer': function () {
        Meteor.call('addR1OPPTDs', null);
    },

    'keyup .playername ': function(e){
     r1oppTDs.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'click .delete': function () {
      r1oppTDs.remove(this._id);
    },
  });


/*
    var maxr1scores = function(drives_played,total_drives,ntos,score) {
        return parseInt(score) + ((Math.abs(total_drives-drives_played) - ntos) * 8);
    }
*/
  Template.r1scores.events({

    'keyup .totalDrives ': function(e){
     r1scores.update({_id: this._id}, {$set: { totalDrives: $(e.target).val()}});
    },


    'keyup .r1Score ': function(e){
     r1scores.update({_id: this._id}, {$set: { r1Score: $(e.target).val()}});
     score = r1scores.findOne({ _id: this._id });

   //  maxscore = maxr1scores(score.r1Drives, score.totalDrives,score.r1NTO,score.r1Score);
   //  r1scores.update({_id: this._id}, {$set: { r1MaxScore: maxscore }});


    },

    'keyup .r1Drives ': function(e){
     r1scores.update({_id: this._id}, {$set: { r1Drives: $(e.target).val()}});
    },
    'keyup .r1NTO ': function(e){
     r1scores.update({_id: this._id}, {$set: { r1NTO: $(e.target).val()}});
    },

    'keyup .r1oppScore ': function(e){
     r1scores.update({_id: this._id}, {$set: { r1oppScore: $(e.target).val()}});
    },

    'keyup .r1oppDrives ': function(e){
     r1scores.update({_id: this._id}, {$set: { r1oppDrives: $(e.target).val()}});
    },
    'keyup .r1oppNTO ': function(e){
     r1scores.update({_id: this._id}, {$set: { r1oppNTO: $(e.target).val()}});
    },

  });




  Template.r1scores.r1scoresList = function(){
    return r1scores.find();
  }
  Template.r1Held.r1HoldList = function(){
    return r1Holds.find();
  }

  Template.r1oppHeld.r1oppHoldList = function(){
    return r1oppHolds.find();
  }
  Template.r1TDs.r1TDsList = function(){
    return r1TDs.find();
  }

  Template.r1oppTDs.r1oppTDsList = function(){
    return r1oppTDs.find();
  }




  Template.downMenu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  })


  Template.r1scores.helpers({
    equals: function(a, b) {
        return a == b;
    },
    maxscore: function(drives_played,total_drives,ntos,score) {
      // return Math.abs(total_drives-drives_played) - ntos) * 8) + score;
       return parseInt(score) + (((total_drives-drives_played  )+ parseInt(ntos) ) * 8)
ooo
    },

    matchdiff: function(totalDrives,r1Drives,r1NTO,r1Score,r1oppDrives,r1oppNTO,r1oppScore) {

     return (parseInt(r1Score) + ((Math.abs(totalDrives -r1Drives) + parseInt(r1NTO)) * 8)) - (parseInt(r1oppScore) + ((Math.abs(totalDrives -r1oppDrives) + parseInt(r1oppNTO)) * 8))  ;
    },

     clinch: function(r1Score ,totalDrives, r1oppDrives,r1oppNTO,r1oppScore) {

     return  (parseInt(r1oppScore) + ((Math.abs(totalDrives -r1oppDrives) + parseInt(r1oppNTO)) * 8)) - r1Score + 1;
    },

   ppd: function(score, drives) {
        var calcPPD = (parseFloat(score) / parseFloat(drives) )
        return calcPPD.toFixed(2);
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

