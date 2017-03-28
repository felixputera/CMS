import { Meteor } from 'meteor/meteor'

import { Crises } from '../crises.js'

Meteor.publish('crises.fire', () => {
    return Crises.find({
        type: 'fire'
    }, {
        resolved: false
    });
});

Meteor.publish('crises.flood', () => {
    return Crises.find({
        type: 'flood'
    }, {
        resolved: false
    });
});

Meteor.publish('crises.road', () => {
    return Crises.find({
        type: 'road'
    }, {
        resolved: false
    });
});