
play_data = new Meteor.Collection('play_data');
Meteor.subscribe('play_data');

Template.def_stats_main.events({

  'keyup .playdata ': function(e){
    console.log($(e.target).val());
    data_id = $(e.target)[0].id;
    console.log(data_id);
    def_play = data_id.split("-")[0];
    off_play = data_id.split("-")[1];
    play_data.upsert({_id: data_id}, {$set: { 
                              def_play: def_play, 
                              off_play: off_play, 
                              data: $(e.target).val()    
                            }});

    string = $(e.target).val()
    if (string.charAt(string.length - 1) == ',') {
        string = string.substr(0, string.length - 1);
    }
        var data = string.trim().split(",");
        var length = data.length;
        var sum = 0;

        for (var i=0; i< length;i++) {
            sum += parseFloat(data[i]);
        }

        var calcAvg =  parseFloat( sum / parseFloat(length) ).toFixed(2);   

        calcAvg = parseFloat(calcAvg);

       play_data.upsert({_id: data_id}, {$set: {
                              def_play: def_play,
                              off_play: off_play,
                              data: $(e.target).val(),
                              avg: calcAvg
                            }});


  },


  'paste .playdata ': function(e){
    console.log($(e.target).val());
    data_id = $(e.target)[0].id;
    console.log(data_id);
    def_play = data_id.split("-")[0];
    off_play = data_id.split("-")[1];
    play_data.upsert({_id: data_id}, {$set: {
                              def_play: def_play,
                              off_play: off_play,
                              data: $(e.target).val()
                            }});

    string = $(e.target).val()
    if (string.charAt(string.length - 1) == ',') {
        string = string.substr(0, string.length - 1);
    }
        var data = string.trim().split(",");
        var length = data.length;
        var sum = 0;

        for (var i=0; i< length;i++) {
            sum += parseFloat(data[i]);
        }

        var calcAvg =  parseFloat( sum / parseFloat(length) ).toFixed(2);

        calcAvg = parseFloat(calcAvg);
       play_data.upsert({_id: data_id}, {$set: {
                              def_play: def_play,
                              off_play: off_play,
                              data: $(e.target).val(),
                              avg: calcAvg
                            }});


  },


});


Template.def_stats_main.helpers({
    getData: function(a, b) {
        var d  = play_data.findOne({ _id: a + "-"  + b } );; 
        return d.data;
    },
    getAvg: function(a, b) {
        var d  = play_data.findOne({ _id: a + "-"  + b } );;
        var data = d.data.trim().split(",");
        var length = data.length;
        var sum = 0;
        for (i=0; i< length;i++) {
            sum += data[i];
        }
        return sum / length;;
    },
});


Template.show_plays.helpers({
    getData: function(a, b) {
        var d  = play_data.findOne({ _id: a + "-"  + b } );;
        if (d == null) return "";

        return d.data;
    },

    getAvg: function(a, b) {
        
        var d  = play_data.findOne({ _id: a + "-"  + b } );;
        if (d == null) return "";        
        var string = d.data;
        if (string.charAt(string.length - 1) == ',') {
             string = string.substr(0, string.length - 1);
        }
        var data = string.trim().split(",");
        var length = data.length;
        var sum = 0;

        for (var i=0; i< length;i++) {
            sum += parseFloat(data[i]);
        }

        return parseFloat( sum / parseFloat(length) ).toFixed(2);
    },
});

