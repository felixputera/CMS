import { Meteor } from 'meteor/meteor';

import { googleMapsClient } from './maps-client.js'

export const generateCoordinates = (postalCode) => {
    const coordinates = { lat: 0, lng: 0 };
    let geocodingPayload;
    if(postalCode.length === 5){
        postalCode = '0' + postalCode;
    }
    geocodingPayload = 'Singapore' + postalCode;
    let syncMaps = Meteor.wrapAsync(googleMapsClient.geocode);
    let response = syncMaps({ address: geocodingPayload });
    if(response.json.status === 'OK'){
        coordinates.lat = response.json.results[0].geometry.location.lat;
        coordinates.lng = response.json.results[0].geometry.location.lng;
        console.log(coordinates.lat, coordinates.lng)
    }
    return coordinates;
};

export const generateRegion = (postalCode) => {
    if(postalCode.length === 5){
        postalCode = '0' + postalCode;
    }
    const regionJson = JSON.parse(Assets.getText("region.json"));
    const regionCode = String(postalCode).slice(0, 2);
    return regionJson[regionCode]
};