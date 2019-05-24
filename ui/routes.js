
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
