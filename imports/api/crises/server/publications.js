import { Meteor } from 'meteor/meteor'

import { Crises } from '../crises.js'

Meteor.publish('crises.fire', () => {
    return Crises.find({
        type: 'fire'
    });
});

Meteor.publish('crises.flood', () => {
    return Crises.find({
        type: 'flood'
    });
});

Meteor.publish('crises.road', () => {
    return Crises.find({
        type: 'road'
    });
});