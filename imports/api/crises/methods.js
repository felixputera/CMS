import { Meteor } from 'meteor/meteor';

import { Crises } from './crises.js';

import '../../utils/sms-sender.js';

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
        sendAlert(region, address, type, description);
    }
})

const sendAlert = (regionArea, address, type, description) => {
    let message = "[INCIDENT IN YOUR AREA] A " + type + " just happened at " + address + ". " + description;
    sendSMS(regionArea, message);
}