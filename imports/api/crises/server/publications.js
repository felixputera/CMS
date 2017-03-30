import { Meteor } from 'meteor/meteor'

import { Crises } from '../crises.js'

Meteor.publish('crises.fire', function publishFire(){
    return Crises.find({
        type: 'fire'
    }, {
        resolved: false
    });
});

Meteor.publish('crises.flood', function publishFlood(){
    return Crises.find({
        type: 'flood'
    }, {
        resolved: false
    });
});

Meteor.publish('crises.road', function publishRoad(){
    return Crises.find({
        type: 'road'
    }, {
        resolved: false
    });
});

Meteor.publish('crises.gasLeak', function publishRoad(){
    return Crises.find({
        type: 'gasLeak'
    }, {
        resolved: false
    });
});