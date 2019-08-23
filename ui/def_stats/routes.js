import "/ui/main/main.html"
FlowRouter.route('/', {
  name: 'main.show',
  action() {
  BlazeLayout.render('main', {});
  }
});


import "/ui/dsheet/dsheet.html"
FlowRouter.route('/add_defplays', {
  name: 'main.show',
  action() {
  BlazeLayout.render('d_play', {});
  }
});


import "/ui/oplays/oplays.html"
FlowRouter.route('/add_offplays', {
  name: 'main.show',
  action() {
  BlazeLayout.render('o_play', {});
  }
});


