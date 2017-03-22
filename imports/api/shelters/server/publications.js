import { Meteor } from 'meteor/meteor'

import { Shelters } from '../shelters.js'

Meteor.publish('shelters', function sheltersPublication(){
    return Shelters.find();
});