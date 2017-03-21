import { Meteor } from 'meteor/meteor'

import { Crises } from '../psi.js'

Meteor.publish('psi', function psiPublication(){
    return Psi.find();
});