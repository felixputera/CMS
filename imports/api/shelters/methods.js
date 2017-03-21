import { Meteor } from 'meteor/meteor';

import { Shelters } from './shelters.js';

Meteor.methods({
    'shelters.insert'(name, type, address, postalCode, region) {
        // if (!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }
        Shelters.insert({
            name,
            type,
            address,
            postalCode,
            coordinate: ()=>null, //function to make api call to google
            region
        });
    },
    'shelters.update'(){
        
    },
})

