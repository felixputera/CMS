import { Meteor } from 'meteor/meteor';

import { generateCoordinates } from '../../utils/address-tools.js'

import { Crises } from './crises.js';

Meteor.methods({
    'crises.insert'(region, address, type, description, assistance, postalCode) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const coordinates = generateCoordinates(address);
        Crises.insert({
            time: new Date(),
            region: region,
            address: address,
            postalCode: postalCode,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            type: type,
            description: description,
            userId: this.userId,
            assistance: assistance,
            resolved: false,
        });
    },
    'crises.setResolved'(crisisId){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Crises.update(crisisId, {
            $set:{
                resolved: true,
            },
        });
    },
})