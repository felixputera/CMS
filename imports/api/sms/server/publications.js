import { Meteor } from 'meteor/meteor'

import { Sms } from '../sms.js'

Meteor.publish('sms', function smsPublication(){
    return Sms.find();
});