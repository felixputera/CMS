import { Meteor } from 'meteor/meteor'

import { RequestsAss } from '../requests.js'

Meteor.publish('requests', function requestsPublication(){
    return RequestsAss.find();
});