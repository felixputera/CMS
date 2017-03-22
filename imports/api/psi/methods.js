import { Meteor } from 'meteor/meteor';

import { Psi } from './psi.js';

Meteor.methods({
    'psi.insert'() {
        psi.insert({
            time: new Date(),
            north,
            central,
            east,
            west,
            south,
        });
    },
    'psi.update'(){
        
    },
})