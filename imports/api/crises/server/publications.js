import { Meteor } from 'meteor/meteor'

import { Crises } from '../crises.js'

Meteor.publish('crises', function crisesPublication(){
    return Crises.find();
});