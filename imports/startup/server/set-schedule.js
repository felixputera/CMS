import { Meteor } from 'meteor/meteor'
import { SyncedCron } from 'meteor/percolate:synced-cron'

import { sendEmail, postFacebook, postTwitter } from '../../utils/social-media.js'


SyncedCron.add({
    name: 'Update regularly nea psi data',
    schedule: (parser) => {
        // parser is a later.parse object
        return parser.recur().on(15).minute();
    },
    job: () => {
        Meteor.call('psi.fetch');
    }
});

SyncedCron.add({
    name: 'Send regular PM report',
    schedule: (parser) => {
        return parser.text('every 30 minutes');
    },
    job: () => {
        sendEmail("pentium.pm@mail.com", Meteor.call('pmReport'));
    }
});

SyncedCron.add({
    name: 'Send regular social media update',
    schedule: (parser) => {
        return parser.text('every 1 hour');
    },
    job: () => {
        const socMedMessage = Meteor.call('socMedReport');
        postTwitter(socMedMessage);
        postFacebook(socMedMessage);
    }
});

Meteor.startup(() => {
    Meteor.call('psi.fetch');							// get psi level from nea api
    const socMedMessage = Meteor.call('socMedReport');	// associate message with info fetched
    postTwitter(socMedMessage);							// post updated info on twitter
    postFacebook(socMedMessage);						// post updated info on facebook
    SyncedCron.start();
});