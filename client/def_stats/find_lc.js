

/*
Template.find_lc_off_plays.onCreated(function () { 
    Session.set("off_play_search", "-");

});



Template.find_lc_off_plays.events({
  'change .findlc': function(e,template){
    Session.set('off_play_search', $(e.target).val());
  },
});
//Template.find_lc_off_plays.helpers({ oList: function() { return offensive_plays.find() }, });

Template.find_lc_off_plays.helpers({ oList: function() { return offensive_plays.find() },
    testme: function() {
    if (Session.get("off_play_search") == "-") return [];
       return play_data.find({ off_play: Session.get("off_play_search") }, { sort: { avg: 1 } });
    },

    findDefPlay: function(id) { 
        return defensive_plays.findOne({_id: id}).def_play;
    }, 

    findDefPlay_formation: function(id) {
        return defensive_plays.findOne({_id: id}).formation;
    }


});
*/
Template.lc_table.helpers({
oList: function() { return offensive_plays.find() },
    getPlayData: function(id) {
        return play_data.find({ off_play: id , avg: { $not: NaN }  }, { sort: { avg: 1 } });
    },

    dataCount: function(data) {
        if (data == null || data == "") return 0;
        if (data.trim().substring(data.length-1,data.length) == "," ) {
        data = data.trim().substring(0, data.length-1);
        }
        return data.split(",").length;
    },
     findDefPlay: function(id) {
        return defensive_plays.findOne({_id: id}).def_play;
    },

    findDefPlay_formation: function(id) {
        return defensive_plays.findOne({_id: id}).formation;
    }   

});
