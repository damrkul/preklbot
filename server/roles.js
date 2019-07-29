import { Roles } from 'meteor/alanning:roles'

;(function () {

import { Roles } from 'meteor/alanning:roles'
  "use strict";


////////////////////////////////////////////////////////////////////
// Startup
//

Meteor.startup(function () {

  ////////////////////////////////////////////////////////////////////
  // Create Test Users
  //

  if (Meteor.users.find().fetch().length === 0) {

    console.log('Creating users: ');
/*
    var users = [
        {name:"Normal User",email:"normal@example.com",password: "apple1",roles:[]},
        {name:"View-Secrets User",email:"view@example.com",password: "apple1",roles:['view-secrets']},
        {name:"Manage-Users User",email:"manage@example.com",password: "apple1", roles:['manage-users']},
        {name:"REKOUS",email:"rankintoday@gmail.com", password: "pacman123",roles:['admin']}
      ];
*/

/*
    var users = [
        {name:"Jawbone71",email:"Thepriceisright3100@gmail.com",password: "Gohabsgo123",roles:[]},
        {name:"Tybraun14",email:"tybraun14@gmail.com",password: "Braun6860",roles:[]},
        {name:"KingSan",email:"hsaleh831@gmail.com",password: "RekousruleZ",roles:[]},
        {name:"Rick Fichetr",email:"Fichterick@yahoo.com",password: "052105",roles:[]},
        {name:"Mike Fichetr",email:"Mikefichter@gmail.com",password: "dutch1105",roles:[]},
        {name:"Roxy",email:"bigtonejunior@yahoo.com",password: "Nathaniel1",roles:[]},
        {name:"Drew",email:"drewstewartdesigns@gmail.com",password: "Ninja1668!",roles:[]},
//        {name:"SadPanda",email:"stevenkmcallister@gmail.com",password: "WinTheDay85!",roles:[]},
        {name:"REKOUS",email:"rankintoday@gmail.com", password: "pacman123",roles:['admin']}
      ];
   // _.each(users, function (userData) {
    users.forEach(function (userData) {
      var id,
          user;
      
      console.log(userData);

      id = Accounts.createUser({
        email: userData.email,
        password: userData.password,
        profile: { name: userData.name }
      });

      
      // email verification
      Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

      Roles.addUsersToRoles(id, userData.roles);
    
    });
*/
  }


    var users = [
        {name:"Jawbone71",email:"Thepriceisright3100@gmail.com",password: "Gohabsgo123",roles:[]},
        {name:"Tybraun14",email:"tybraun14@gmail.com",password: "Braun6860",roles:[]},
        {name:"KingSan",email:"hsaleh831@gmail.com",password: "RekousruleZ",roles:[]},
        {name:"Rick Fichetr",email:"Fichterick@yahoo.com",password: "052105",roles:[]},
        {name:"Mike Fichetr",email:"Mikefichter@gmail.com",password: "dutch1105",roles:[]},
        {name:"Roxy",email:"bigtonejunior@yahoo.com",password: "Nathaniel1",roles:[]},
        {name:"Drew",email:"drewstewartdesigns@gmail.com",password: "Ninja1668!",roles:[]},
        {name:"SadPanda",email:"stevenkmcallister@gmail.com",password: "WinTheDay85!",roles:[]},
        {name:"Craw Daddi",email:"Crawdaddioh@gmail.com",password: "Camybba",roles:[]},
        {name:"REKOUS",email:"rankintoday@gmail.com", password: "pacman123",roles:['admin']}
      ];
   // _.each(users, function (userData) {
    users.forEach(function (userData) {
      try { 
      var id,
          user;

      console.log(userData);

      id = Accounts.createUser({
        email: userData.email,
        password: userData.password,
        profile: { name: userData.name }
      });


      // email verification
      Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

      Roles.addUsersToRoles(id, userData.roles);
        console.log("added");
      } catch(e) { 
            console.log("Already added");
        }
    });


  ////////////////////////////////////////////////////////////////////
  // Prevent non-authorized users from creating new users
  //

  Accounts.validateNewUser(function (user) {
    var loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
      return true;
    }

    throw new Meteor.Error(403, "Not authorized to create new users");
  });

});


////////////////////////////////////////////////////////////////////
// Publish
//


// Authorized users can manage user accounts
Meteor.publish("users", function () {
  var user = Meteor.users.findOne({_id:this.userId});

  if (Roles.userIsInRole(user, ["admin","manage-users"])) {
    console.log('publishing users', this.userId)
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1, roles: 1}});
  } 

  this.stop();
  return;
});

}());
