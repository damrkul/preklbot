import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

/*Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/

phrases = new Meteor.Collection('phrases');
Meteor.subscribe('phrases');

Template.phrases.events({
  'click .add-phrase': function () {
    Meteor.call('addPhrase', null);
  },

  'keyup .phrase-phrase ': function(e){
    phrases.update({_id: this._id}, {$set: { phrase: $(e.target).val()}});
  },
  'keyup .phrase-reply ': function(e){
    phrases.update({_id: this._id}, {$set: { reply: $(e.target).val()}});
  },

  'click .delete-phrase': function () {
    phrases.remove(this._id);
  },

});

Template.phrases.phrasesList = function(){
  return phrases.find();
}

