import { Meteor } from 'meteor/meteor';

import { Crises } from './psi.js';

Meteor.methods({
    'psi.insert'() {
        psi.insert({
            time: new Date(),
            values: ()=>null, //function to make api call to NEA
        });
    },
    'psi.update'(){
        
    },
})