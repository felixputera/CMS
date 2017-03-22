import { Meteor } from 'meteor/meteor';

import { Psi } from './psi.js';

Meteor.methods({
    'psi.insert'(north, central, east, west, south) {
        Psi.insert({
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