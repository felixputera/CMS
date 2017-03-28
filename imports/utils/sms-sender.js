import { Meteor } from 'meteor/meteor';

import { Sms } from '../api/sms/sms.js';



let twilio = require('twilio');

// Find your account sid and auth token in your Twilio account Console.
let client = new twilio.RestClient('AC57c5ef6c2e8c6ed495d5675b577fc369', '73007e7d99d9c42308bd2446a431e6ae');


export const sendSms = (regionArea, address, type, description) => {
    let phoneNumbers = Sms.find({region: regionArea});
    let message = "[INCIDENT IN YOUR AREA] A " + type + " just happened at " + address + ". " + description;
    phoneNumbers.forEach(function (num){
        client.messages.create({
            body: message,
            to: num.phoneNumber,  // Text this number
            from: '+61439071940' // From a valid Twilio number
        }, function(err, message) {
            if(err) {
                console.error(err.message);
            }
        });
    console.log('sms sent');
    });
}