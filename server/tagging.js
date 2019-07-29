
const tags = new Meteor.Collection('tags');

tags.allow({
  remove: function() { return true; },
  update: function() { return true; },
});

    // Insert sample data if the scores collection is empty
if (tags.find().count() === 0) {
    var tag = { "_id": "1",
              "tag": "@rekousDotCom",
              "reply": "@Matty_Gandolf_Breton",
               };
    tags.insert(tag);
}



Meteor.methods({
  addTag: function(player) {
    return tags.insert({
      'tag': "OWNER",
      'reply': "WHO TO TAG?",
    });
  },
});

Meteor.publish('tags', function() {
    return tags.find();
});
