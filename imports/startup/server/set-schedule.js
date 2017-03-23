import { Meteor } from 'meteor/meteor'

SyncedCron.add({
  name: 'Update regularly nea psi data',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.recur().on(15).minute();
  },
  job: function() {
    Meteor.call('psi.fetch');
  }
});

Meteor.startup(() => {
    SyncedCron.start();
});