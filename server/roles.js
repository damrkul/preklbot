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
  }

/*
    var users = [
        {name:"Epic",email:"MikeHunt69@msn.com",password: "mikehunt",roles:[]},
        {name:"JadeJules",email:"ivangospich@gmail.com",password: "Global1",roles:[]},
        {name:"SaintGizmo",email:"normanjay123@gmail.com",password: "gizmo72",roles:[]},
        {name:"Jason Mader",email:"jasonamader@gmail.com",password: "3Sektv44!",roles:[]},
        {name:"Conq",email:"conquistador@gmail.com",password: "Sept2019",roles:[]},
        {name:"DeezBryant",email:"JuliusCampbell217@gmail.com",password: "Deez88",roles:[]},
        {name:"Greenie",email:"rekousisoncrack@gmail.com",password: "NotSharingPW",roles:[]},
        {name:"Kaps",email:"Kappaspyro@gmail.com",password: "Paws1030",roles:[]},
        {name:"CashCow",email:"rjktheiii@yahoo.com",password: "PwW114412$$",roles:[]},
        {name:"Z2G",email:"Adam.Baessler@icloud.com",password: "Greenie27",roles:[]},
        {name:"Jawbone71",email:"Thepriceisright3100@gmail.com",password: "Gohabsgo123",roles:[]},
        {name:"Tybraun14",email:"tybraun14@gmail.com",password: "Braun6860",roles:[]},
        {name:"KingSan",email:"hsaleh831@gmail.com",password: "RekousruleZ",roles:[]},
        {name:"Rick Fichetr",email:"Fichterick@yahoo.com",password: "052105",roles:[]},
        {name:"Mike Fichetr",email:"Mikefichter@gmail.com",password: "dutch1105",roles:[]},
        {name:"Roxy",email:"bigtonejunior@yahoo.com",password: "Nathaniel1",roles:[]},
        {name:"Drew",email:"drewstewartdesigns@gmail.com",password: "Ninja1668!",roles:[]},
        {name:"SadPanda",email:"stevenkmcallister@gmail.com",password: "WinTheDay85",roles:[]},
        {name:"Craw Daddi",email:"Crawdaddioh@gmail.com",password: "Camybba",roles:[]},
        {name:"Golf B-Rad",email:"Okellyb2@winthrop.edu",password: "FUCKEA",roles:[]},
        {name:"Rdsbaker",email:"rdsbaker@gmail.com",password: "024883",roles:[]},
        {name:"Mulkey",email:"mulkey562@yahoo.com",password: "Madden11",roles:[]},
        {name:"Schweef",email:"alexschwefel11@gmail.com",password: "PWW4life",roles:[]},
        {name:"Kuk9er",email:"alexschwefel11@gmail.com",password: "PWW4champs!",roles:[]},
        {name:"jhackett714",email:"jhackett714@gmail.com",password: "james123",roles:[]},
        {name:"LegendOfTheWest",email:"matthewpiercy5@gmail.com",password: "LegendOfTheWest1",roles:[]},
        {name:"Gage",email:"gage_cox@ymail.com",password: "madden123",roles:[]},
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
//            console.log(e);
        }
    });
*/

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

Meteor.methods({
  addUser: function(user) {
   // try {
        var roles = [];
        id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: { name: user.ign }
      });


      // email verification
      Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

      Roles.addUsersToRoles(id, roles);
        console.log("ADD");
        returnMessage ="User Added Successfully";
/*      } catch(e) {
        console.log(e.message);
         returnMessage =  e.message;
      } */
        return returnMessage;
  },
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
