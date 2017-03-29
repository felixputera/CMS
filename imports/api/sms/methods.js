import { Meteor } from 'meteor/meteor';

import { Sms } from './sms.js';

Meteor.methods({
    'sms.insert'(phoneNumber, region) {
        Sms.insert({
            phoneNumber,
            region
        });
    },
})