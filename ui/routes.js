
import "/ui/main/main.html"
FlowRouter.route('/', {
  name: 'main.show',
  action() {
  BlazeLayout.render('main', {});
  }
});


import "/ui/match_status/match_status.html"
FlowRouter.route('/match_status/', {
  name: 'match_status.show',
  action() {
  BlazeLayout.render('match_status', {});
  }
});

import "/ui/tagging/tagging_main.html"
FlowRouter.route('/tagging', {
  name: 'tagging_main.show',
  action() {
  BlazeLayout.render('tagging_main', {});
  }
});


import "/ui/r1_match_status/match_status.html"
FlowRouter.route('/r1_match_status', {
  name: 'r1_match_status.show',
  action() {
  BlazeLayout.render('r1_match_status', {});
  }
});



import "/ui/lawn_match_status/match_status.html"
FlowRouter.route('/lawn_match_status', {
  name: 'lawn_match_status.show',
  action() {
  BlazeLayout.render('lawn_match_status', {});
  }
});
