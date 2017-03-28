import { Meteor } from 'meteor/meteor';

import { Crises } from '../../api/crises/crises.js';

Meteor.startup(() => {
    if(Crises.find().count() === 0){
        console.log('inserting dummy crises')
        Crises.insert({
            time: new Date(),
            region: 'north',
            address: 'kamar',
            postalCode: 123456,
            latitude: 1.345207,
            longitude: 103.701322,
            type: 'road',
            description: 'oops',
            userId: null,
            assistance: true,
            resolved: false,
        });
        Crises.insert({
            time: new Date(),
            region: 'south',
            address: 'ggwp',
            postalCode: 123456,
            latitude: 1.341088,
            longitude: 103.722372,
            type: 'fire',
            description: 'kebakaran',
            userId: null,
            assistance: true,
            resolved: false,
        });
        Crises.insert({
            time: new Date(),
            region: 'south',
            address: 'water',
            postalCode: 123456,
            latitude: 1.341423,
            longitude: 103.725789,
            type: 'flood',
            description: 'banjir mas',
            userId: null,
            assistance: true,
            resolved: false,
        });
        
    }
});