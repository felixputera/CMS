import { Meteor } from 'meteor/meteor';

import { Sms } from './sms.js';

Meteor.methods({
    'sms.insert'(phoneNumber, region) {
        // if (!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }
        Sms.insert({
            phoneNumber,
            region
        });
    },
    'crises.'(){
        
    },
})