
phrases = new Meteor.Collection('phrases');
Meteor.subscribe('phrases');

Template.phrases.events({
  'click .add-phrase': function () {
    Meteor.call('addPhrase', null);
  },

  'keyup .phrase-phrase ': function(e){
    phrases.update({_id: this._id}, {$set: { phrase: $(e.target).val()}});
  },
  'paste .phrase-phrase ': function(e){
    phrases.update({_id: this._id}, {$set: { phrase: $(e.target).val()}});
  },

  'keyup  .phrase-reply ': function(e){
    phrases.update({_id: this._id}, {$set: { reply: $(e.target).val()}});
  },
  'paste .phrase-reply ': function(e){
    phrases.update({_id: this._id}, {$set: { reply: $(e.target).val()}});
  },
  'click .delete-phrase': function () {
    phrases.remove(this._id);
  },

});

Template.phrases.phrasesList = function(){
  return phrases.find();
}
