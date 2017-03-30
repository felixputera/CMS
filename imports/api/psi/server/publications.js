import { Meteor } from 'meteor/meteor'

import { Psi } from '../psi.js'

Meteor.publish('psi', function psiPublication(){
    return Psi.find({}, {sort: {time: -1, limit: 1}});
});