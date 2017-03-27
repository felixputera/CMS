import { Meteor } from 'meteor/meteor';

import { generateCoordinates, generateRegion } from '../../utils/address-tools.js'

import { Shelters } from './shelters.js';

Meteor.methods({
    'shelters.insert'(name, type, address, postalCode) {
        const coordinates = generateCoordinates(postalCode);
        const region = generateRegion(postalCode);
        Shelters.insert({
            name: name,
            type: type,
            address: address,
            postalCode: postalCode,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            region: region,
        });
    },
})