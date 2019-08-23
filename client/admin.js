Template.admin.onCreated(function () {
  this.subscribe("users")
})

Template.admin.helpers({
  users: function () {
    return Meteor.users.find({}, { sort: { roles: -1 } });
  },
  email: function () {
    return this.emails[0].address
  },
  roles: function () {
    if (!this.roles) {
      return '<none>'
    }

    return this.roles.join(',')
  },
  equals: function(a, b) {
        return a == b;
    },
  checkNotAdmin: function (roles) {
    if  ( roles != 'admin') {
        return true;
    }
  },
})

Template.admin.events({ 
    'click .remove-user': function (e) {
        console.log("TEST");
        var checkConfirm = confirm("Are you sure you want to delete: "+ this.profile.name + " ?");
        if (checkConfirm) {  
            Meteor.users.remove(this._id);
        } 

    },

});
Template.adminRoles.helpers({
    equals: function(a, b) {
        return a == b;
    },
  checkRekous: function () {
    if  ( this.emails[0].address == 'rankintoday@gmail.com') 
        return "disabled";
    
  },
})

Meteor.users.allow({
  remove: function(userId, user) { return true; },
  update: function(userId, user) { return true; }

    /**
     * Don't use `return true` in production!
     * You probably need something like this:
     * return Meteor.users.findOne(userId).profile.isAdmin;
     */
});

Template.adminRoles.events({ 
    'change .roles ': function(e){
     Meteor.users.update({_id: this._id}, {$set: { roles: [$(e.target).val()]}});
    },

    'click .remove-user': function () {
        console.log("TEST");
    },
});

/////// ADD user

Template.add_user.events({ 



    'click .add_new_user': function() {
        var checkError = false;
        $("#success").hide();
        $("#error").hide();
        var ign = $("#ign").val();
        var email  = $("#email").val();
        var password = $("#password").val();
        var roles = [] 
       
        var isEmailValid = function(address) {
            return /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(address);
        };
       if (ign.trim() == "") {
            $("#error").html("<b>Error:</b> IGN field is empty");
            $("#error").show();
            checkError = true;
            return;
       }
       if (!isEmailValid(email)) { 
            $("#error").html("<b>Error:</b> Invalid Email");
            $("#error").show();
            checkError = true;
            return;
       } 
       if (password.trim() == "") {
            $("#error").html("<b>Error:</b> Password field is empty");
            $("#error").show();
            checkError = true;
            return;
       }
        var user = {
        ign: ign,
        password: password,
        email: email
       }
    var message = (user) => { 
      return new Promise((success, failure) => {
        Meteor.call('addUser', user, (error, result) => {
                if (error) {
                    failure(error);
                }
                else {
                    success("Added User Successfully");
                }
            });
        });
    };

    message = message(user).then(result => {
        $("#success").show();
    }).catch(error => { 
         $("#error").html("<b>Error:</b> " + error.reason)
         $("#error").show();
         }
    );
    
    }, //End add user

   
});
