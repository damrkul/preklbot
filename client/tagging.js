
tags = new Meteor.Collection('tags');
Meteor.subscribe('tags');

Template.tagging.events({
  'click .add-tag': function () {
    Meteor.call('addTag', null);
  },

  'keyup .tag-tag ': function(e){
    tags.update({_id: this._id}, {$set: { tag: $(e.target).val()}});
  },

  'paste .tag-tag ': function(e){
    tags.update({_id: this._id}, {$set: { tag: $(e.target).val()}});
  },

  'keyup .tag-reply ': function(e){
    tags.update({_id: this._id}, {$set: { reply: $(e.target).val()}});
  },

  'paste .tag-reply ': function(e){
    tags.update({_id: this._id}, {$set: { reply: $(e.target).val()}});
  },


  'click .delete-tag': function () {
    tags.remove(this._id);
  },

});

Template.tagging.tagsList = function(){
  return tags.find({});
}
