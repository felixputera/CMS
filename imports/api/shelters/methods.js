import { Meteor } from 'meteor/meteor';

import { googleMapsClient } from '../../utils/maps-client.js'

import { Shelters } from './shelters.js';

Meteor.methods({
    'shelters.insert'(name, type, address, postalCode, region) {
        let lat = 0, lng = 0;
        if(postalCode.length === 5){
            postalCode = '0' + postalCode;
        }
        syncMaps = Meteor.wrapAsync(googleMapsClient.geocode);
        response = syncMaps({ address: postalCode });
        if(response.status === 'OK'){
            lat = response.json.results[0].geometry.location.lat;
            lng = response.json.results[0].geometry.location.lng;
        }
        Shelters.insert({
            name: name,
            type: type,
            address: address,
            postalCode: postalCode,
            latitude: lat,
            longitude: lng,
            region
        });
    },
    'shelters.update'(){
        
    },
})