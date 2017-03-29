import { Meteor } from 'meteor/meteor';

import { generateCoordinates } from '../../utils/address-tools.js'
import { sendSMS } from '../../utils/sms-sender.js';

import { Crises } from './crises.js';

Meteor.methods({
    'crises.insert'(region, address, type, description, assistance, postalCode) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const coordinates = generateCoordinates(address);
        let d = new Date();
        Crises.insert({
            time: d,
            hour: d.getHours(),
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
        sendAlert(region, address, type, description);
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

const sendAlert = (regionArea, address, type, description) => {
    let message = "[INCIDENT IN YOUR AREA] A " + type + " just happened at " + address + ". " + description;
    sendSMS(regionArea, message);
}