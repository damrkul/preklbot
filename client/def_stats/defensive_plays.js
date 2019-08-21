
defensive_plays = new Meteor.Collection('defensive_plays');
Meteor.subscribe('defensive_plays');



Template.d_play.dList = function(){
    return defensive_plays.find();
  };

 Template.def_stats_main.helpers({
    replaceUnderScores: function(string) {
        string = string.replace(/ /g,"_");

        return string.replace(/-/g,"");
    }
});

Template.show_plays.helpers({
    replaceUnderScores: function(string) {
        string = string.replace(/ /g,"_");
    
        return string.replace(/-/g,"");
    }
});
Template.def_stats_main.d_34 = function(){
    return defensive_plays.find({"formation": "3-4" });
  };

Template.def_stats_main.d_43 = function(){
    return defensive_plays.find({"formation": "4-3" });
  };

Template.def_stats_main.d_nickel = function(){
    return defensive_plays.find({"formation": "Nickel" });
  };

Template.def_stats_main.d_dime = function(){
    return defensive_plays.find({"formation": "Dime" });
  };

Template.def_stats_main.d_quarter = function(){
    return defensive_plays.find({"formation": "Quarter" });
  };

Template.def_stats_main.d_goalline = function(){
    return defensive_plays.find({"formation": "Goal Line" });
  };

Template.def_stats_main.d_specialteams = function(){
    return defensive_plays.find({"formation": "Special Teams" });
  };


 Template.type_menu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  });
  Template.formation_menu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  });

  Template.blitz_menu.helpers({
    equals: function(a, b) {
        return a == b;
    }
  });


Template.d_play.events({
  'click .add-dplay': function () {
    Meteor.call('addDefensivePlay', null);
  },

  'keyup .dplay-name ': function(e){
    defensive_plays.update({_id: this._id}, {$set: { def_play: $(e.target).val()}});
  },

  'click .delete-dplay': function () {
    defensive_plays.remove(this._id);
  },

});

Template.type_menu.events({
  'change .dplay-type ': function(e){
    defensive_plays.update({_id: this._id}, {$set: { type: $(e.target).val()}});
  },
});

Template.formation_menu.events({
  'change .dplay-formation ': function(e){
    defensive_plays.update({_id: this._id}, {$set: { formation: $(e.target).val()}});
  },
});

Template.blitz_menu.events({
  'change .dplay-blitz ': function(e){
    defensive_plays.update({_id: this._id}, {$set: { blitz: $(e.target).is(':checked')}});
  },
});


/*
Template.d_play.dList = function(){
  return defensive_plays.find();
} */
