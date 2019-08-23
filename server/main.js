import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles'



Meteor.users.allow({
  remove: function(userId, user) { 
        if ( Meteor.user().roles[0] == 'admin') { return true; } else { return false; }},
  update: function(userId, user) {
        if ( Meteor.user().roles[0] == 'admin') { return true; } else { return false; }},

  insert: function(userId, user) {
        if ( Meteor.user().roles[0] == 'admin') { return true; } else { return false; }},
});


import './match_status.js';
import './r1_match_status.js';
import './lawn_match_status.js';
import './phrases.js';
import './tagging.js';
import './telegrambot.js';
import './roles.js';
import './def_stats/def_stats_main.js';


Meteor.publish('userList', function() {
  return Meteor.users.find({}, {fields: {username: 1, emails: 1, profile: 1}});
});

