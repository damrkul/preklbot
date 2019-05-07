import { Meteor } from 'meteor/meteor';

import './telegrambot.js';

const phrases = new Meteor.Collection('phrases');

phrases.allow({
  remove: function() { return true; },
  update: function() { return true; },
});

    // Insert sample data if the scores collection is empty
if (phrases.find().count() === 0) {
    var phrase = { "_id": "1",
              "phrase": "beat rekous",
              "reply": "Can't beat the master",
               };
    phrases.insert(phrase);
}



Meteor.methods({
  addPhrase: function(player) {
    return phrases.insert({
      'phrase': "This is your Phrase",
      'reply': "This is your reply",
    });
  },
});

Meteor.publish('phrases', function() {
    return phrases.find();
});

Meteor.startup(() => {
  // code to run on server at startup
});

