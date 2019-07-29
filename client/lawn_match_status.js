

lawnscores = new Meteor.Collection('lawnscores');
lawnHolds = new Meteor.Collection('lawnHolds');
lawnTDs = new Meteor.Collection('lawnTDs');
lawnoppHolds = new Meteor.Collection('lawnoppHolds');
lawnoppTDs = new Meteor.Collection('lawnoppTDs');

  Meteor.subscribe('lawnscores');
  Meteor.subscribe('lawnHolds');
  Meteor.subscribe('lawnoppHolds');
  Meteor.subscribe('lawnTDs');
  Meteor.subscribe('lawnoppTDs');

  Template.lawnHeld.events({

    'click #addLAWNHolds': function () {
        Meteor.call('addLAWNHolds', null);
    },

    'keyup .playername ': function(e){
     lawnHolds.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'change .drive ': function(e){
     lawnHolds.update({_id: this._id}, {$set: { drive: $(e.target).val()}});
    },
    'change .down ': function(e){
     lawnHolds.update({_id: this._id}, {$set: { down: $(e.target).val()}});
    },

    'change .fgrange ': function(e){
     lawnHolds.update({_id: this._id}, {$set: { fgRange: $(e.target).is(':checked')}});
    },
    'keyup .yards ': function(e){
     lawnHolds.update({_id: this._id}, {$set: { yards: $(e.target).val()}});
    },

    'click .delete-lawnHold': function () {
      lawnHolds.remove(this._id);
    },
  });




  Template.lawnoppHeld.events({

    'click #addLAWNOPPHolds': function () {
        Meteor.call('addLAWNOPPHolds', null);
    },

    'keyup .playername ': function(e){
     lawnoppHolds.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'change .drive ': function(e){
     lawnoppHolds.update({_id: this._id}, {$set: { drive: $(e.target).val()}});
    },
    'change .down ': function(e){
     lawnoppHolds.update({_id: this._id}, {$set: { down: $(e.target).val()}});
    },

    'change .fgrange ': function(e){
     lawnoppHolds.update({_id: this._id}, {$set: { fgRange: $(e.target).is(':checked')}});
    },
    'keyup .yards ': function(e){
     lawnoppHolds.update({_id: this._id}, {$set: { yards: $(e.target).val()}});
    },

    'click .delete-lawnHold': function () {
      lawnoppHolds.remove(this._id);
    },
  });


  Template.lawnTDs.events({

    'click .addplayer': function () {
        Meteor.call('addLAWNTDs', null);
    },

    'keyup .playername ': function(e){
     lawnTDs.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'click .delete': function () {
      lawnTDs.remove(this._id);
    },
  });




  Template.lawnoppTDs.events({

    'click .addplayer': function () {
        Meteor.call('addLAWNOPPTDs', null);
    },

    'keyup .playername ': function(e){
     lawnoppTDs.update({_id: this._id}, {$set: { name: $(e.target).val()}});
    },

    'click .delete': function () {
      lawnoppTDs.remove(this._id);
    },
  });


/*
    var maxlawnscores = function(drives_played,total_drives,ntos,score) {
        return parseInt(score) + ((Math.abs(total_drives-drives_played) - ntos) * 8);
    }
*/
  Template.lawnscores.events({

    'keyup .totalDrives ': function(e){
     lawnscores.update({_id: this._id}, {$set: { totalDrives: $(e.target).val()}});
    },


    'keyup .lawnScore ': function(e){
     lawnscores.update({_id: this._id}, {$set: { lawnScore: $(e.target).val()}});
     score = lawnscores.findOne({ _id: this._id });

   //  maxscore = maxlawnscores(score.lawnDrives, score.totalDrives,score.lawnNTO,score.lawnScore);
   //  lawnscores.update({_id: this._id}, {$set: { lawnMaxScore: maxscore }});


    },

    'keyup .lawnDrives ': function(e){
     lawnscores.update({_id: this._id}, {$set: { lawnDrives: $(e.target).val()}});
    },
    'keyup .lawnNTO ': function(e){
     lawnscores.update({_id: this._id}, {$set: { lawnNTO: $(e.target).val()}});
    },

    'keyup .lawnoppScore ': function(e){
     lawnscores.update({_id: this._id}, {$set: { lawnoppScore: $(e.target).val()}});
    },

    'keyup .lawnoppDrives ': function(e){
     lawnscores.update({_id: this._id}, {$set: { lawnoppDrives: $(e.target).val()}});
    },
    'keyup .lawnoppNTO ': function(e){
     lawnscores.update({_id: this._id}, {$set: { lawnoppNTO: $(e.target).val()}});
    },

  });




  Template.lawnscores.lawnscoresList = function(){
    return lawnscores.find();
  }
  Template.lawnHeld.lawnHoldList = function(){
    return lawnHolds.find();
  }

  Template.lawnoppHeld.lawnoppHoldList = function(){
    return lawnoppHolds.find();
  }
  Template.lawnTDs.lawnTDsList = function(){
    return lawnTDs.find();
  }

  Template.lawnoppTDs.lawnoppTDsList = function(){
    return lawnoppTDs.find();
  }




  Template.downMenu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  })


  Template.lawnscores.helpers({
    equals: function(a, b) {
        return a == b;
    },
    maxscore: function(drives_played,total_drives,ntos,score) {
      // return Math.abs(total_drives-drives_played) - ntos) * 8) + score;
       return parseInt(score) + (((total_drives-drives_played  )+ parseInt(ntos) ) * 8)
ooo
    },

    matchdiff: function(totalDrives,lawnDrives,lawnNTO,lawnScore,lawnoppDrives,lawnoppNTO,lawnoppScore) {

     return (parseInt(lawnScore) + ((Math.abs(totalDrives -lawnDrives) + parseInt(lawnNTO)) * 8)) - (parseInt(lawnoppScore) + ((Math.abs(totalDrives -lawnoppDrives) + parseInt(lawnoppNTO)) * 8))  ;
    },

     clinch: function(lawnScore ,totalDrives, lawnoppDrives,lawnoppNTO,lawnoppScore) {

     return  (parseInt(lawnoppScore) + ((Math.abs(totalDrives -lawnoppDrives) + parseInt(lawnoppNTO)) * 8)) - lawnScore + 1;
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

