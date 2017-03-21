import { Meteor } from 'meteor/meteor';

import { Crises } from './crises.js';

Meteor.methods({
    'crises.insert'(region, address, postalCode, type, description) {
        // if (!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }
        Crises.insert({
            time: new Date(),
            region,
            address,
            postalCode,
            coordinate: ()=>null, //function to make api call to google
            type,
            description,
            //reporter: this.userId,
        });
    },
    'crises.update'(){
        
    },
})