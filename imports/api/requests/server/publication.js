import { Meteor } from 'meteor/meteor'

import { Requests } from '../requests.js'

Meteor.publish('requests', function requestsPublication(){
    return Requests.find();
});