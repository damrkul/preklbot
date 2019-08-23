

// override with mini-pages navigate method
Meteor.navigateTo = function (path) {
  FlowRouter.go(path)
}

import "/ui/layout/example.html"
import "/ui/layout/example.css"

import "/ui/main/main.html"
FlowRouter.route('/', {
  name: 'main.show',
  action() {
  BlazeLayout.render('mainLayout', {content:'main'});
  }
});


import "/ui/match_status/match_status.html"
FlowRouter.route('/match_status/', {
  name: 'match_status.show',
  action() {
  BlazeLayout.render('mainLayout', {content: 'match_status'});
  }
});

import "/ui/tagging/tagging_main.html"
FlowRouter.route('/tagging', {
  name: 'tagging_main.show',
  action() {
  BlazeLayout.render('mainLayout', {content: 'tagging_main'});
  }
});


import "/ui/r1_match_status/match_status.html"
FlowRouter.route('/r1_match_status', {
  name: 'r1_match_status.show',
  action() {
  BlazeLayout.render('mainLayout', {content: 'r1_match_status'});
  }
});



import "/ui/lawn_match_status/match_status.html"
FlowRouter.route('/lawn_match_status', {
  name: 'lawn_match_status.show',
  action() {
  BlazeLayout.render('mainLayout', {content: 'lawn_match_status'});
  }
});



FlowRouter.notFound = {
  action: function () {
    BlazeLayout.render("noHeaderLayout", {content: "not_found"})
  }
}

import "/ui/layout/layout.html"
FlowRouter.route('/start', {
  action: function () {
    BlazeLayout.render('mainLayout', {content: 'main'})
  }
})


// DEF STATS

import "/ui/def_stats/main/main.html"
FlowRouter.route('/def_stats', {
  action: function () {
    BlazeLayout.render('mainLayout', {content: 'def_stats_main'})
  }
})

import "/ui/def_stats/oplays/oplays.html"
FlowRouter.route('/add_offplays', {
  action: function () {
    BlazeLayout.render('mainLayout', {content: 'o_play'})
  }
})


import "/ui/def_stats/dplays/dplays.html"
FlowRouter.route('/add_defplays', {
  action: function () {
    BlazeLayout.render('mainLayout', {content: 'd_play'})
  }
})


import "/ui/def_stats/find_lc/find_lc.html"
FlowRouter.route('/find_lc', {
  action: function () {
    BlazeLayout.render('mainLayout', {content: 'find_lc'})
  }
})

/*
import "/ui/def_stats/find_lc/find_lc.html"
FlowRouter.route('/find_lc_bot', {
  action: function (params, queryParams ) {
    var color = FlowRouter.getQueryParam("play");
      BlazeLayout.render('find_lc', {content: 'find_lc'})
  }
})
*/


import "/ui/pww_scoresheet/pww_scoresheet.html"
FlowRouter.route('/pww_scoresheet', {
  action: function () {
    BlazeLayout.render('mainLayout', {content: 'pww_scoresheet'})
  }
})


import "/ui/admin/admin.html"
FlowRouter.route('/admin', {
  action: function () {
    BlazeLayout.render('mainLayout', {content: 'admin'})
  }
})


import "/ui/admin/add_user.html"
FlowRouter.route('/admin/add_user', {
  action: function () {
    BlazeLayout.render('mainLayout', {content: 'add_user'})
  }
})



FlowRouter.route('/signout', {
    action: App.signout
})
