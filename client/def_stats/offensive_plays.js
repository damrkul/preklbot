
offensive_plays = new Meteor.Collection('offensive_plays');
Meteor.subscribe('offensive_plays');


import datatables from 'datatables.net';
Template.def_stats_main.onCreated(function(){
    datatables(window, $);
});

Template.def_stats_main.oList = function(){
    return offensive_plays.find();
};


Template.show_plays.oList = function(){
    return offensive_plays.find();
};

Template.o_play.oList = function(){
    return offensive_plays.find();
};



 Template.show_plays.helpers({
    removeSpaces: function(string) {
        string = string.replace(/ /g,"");
        string = string.replace(/-/g,"");
        return string;
    }
});

 Template.off_type_menu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  });
  Template.off_formation_menu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  });

  Template.off_scheme_menu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  });

  Template.off_coach_menu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  });
Template.o_play.events({
  'click .add-oplay': function () {
    Meteor.call('addOffensivePlay', null);
  },

  'keyup .oplay-name ': function(e){
    offensive_plays.update({_id: this._id}, {$set: { off_play: $(e.target).val()}});
  },

  'click .delete-oplay': function () {
    offensive_plays.remove(this._id);
  },

});

Template.off_type_menu.events({
  'change .oplay-type ': function(e){
    offensive_plays.update({_id: this._id}, {$set: { type: $(e.target).val()}});
  },
});

Template.off_formation_menu.events({
  'change .oplay-formation ': function(e){
    offensive_plays.update({_id: this._id}, {$set: { formation: $(e.target).val()}});
  },
});

Template.off_coach_menu.events({
  'change .oplay-coach ': function(e){
    offensive_plays.update({_id: this._id}, {$set: { coach: $(e.target).val()}});
  },
});

Template.off_scheme_menu.events({
  'change .oplay-scheme ': function(e){
    offensive_plays.update({_id: this._id}, {$set: { scheme: $(e.target).val()}});
  },
});


/*
Template.o_play.dList = function(){
  return offensive_plays.find();
} */
