import { Meteor } from 'meteor/meteor';

import { generateCoordinates } from '../../utils/address-tools.js'
import { sendSms, sendSmsToSpecificNumber } from '../../utils/sms-sender.js';

import { Crises } from './crises.js';

Meteor.methods({
    'crises.insert'(region, address, type, description, assistance, postalCode, unitNumber, useMarker, tempMarker) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        let coordinates;
        if(!useMarker){
            coordinates = generateCoordinates(address);
        } else {
            coordinates = tempMarker;
        }
        let d = new Date();
        Crises.insert({
            time: d,
            hour: d.getHours(),
            region: region,
            address: address,
            postalCode: postalCode,
            unitNumber: unitNumber,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            type: type,
            description: description,
            userId: this.userId,
            assistance: assistance,
            resolved: false,
        });
        sendAlert(region, address, type, description);
        if (assistance) {
            sendToScdf(region, address, type, description);
        }
    },
    'crises.setResolved'(crisisId){
        // if (!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }
        Crises.update(crisisId, {
            $set:{
                resolved: true,
            },
        });
        console.log(crisisId);
        console.log("tay");
    },
});

const sendAlert = (regionArea, address, type, description) => {
    let message = "[INCIDENT IN YOUR AREA] \n A " + type + " just happened at " + address + ". " + description;
    sendSms(regionArea, message);
};

const sendToScdf = (regionArea, address, type, description) => {
    let scdfNumber = 12345678;
    let message = "[Assistance Requested] \n A " + type + " just happened at " + address + ". " + description +
                  ". \n Assistance requested by the reporter.";
    sendSmsToSpecificNumber(scdfNumber, message);
}