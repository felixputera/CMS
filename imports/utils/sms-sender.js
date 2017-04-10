let twilio = require('twilio');

import { Sms } from '../api/sms/sms.js';

const twilioKey = JSON.parse(Assets.getText("api-key.json")).twilio;

// Find your account sid and auth token in your Twilio account Console.
let client = new twilio.RestClient(twilioKey.accountSid, twilioKey.authToken);


export const sendSms = (regionArea, message) => {
    let phoneNumbers = Sms.find({region: regionArea});
    phoneNumbers.forEach(function (num){
        client.messages.create({
            body: message,
            to: num.phoneNumber,  // Text this number
            from: twilioKey.phoneNumber // From a valid Twilio number
        }, function(err, message) {
            if(err) {
                console.error(err.message);
            }
        });
    console.log('sms sent');
    });
};

export const sendSmsToSpecificNumber = (phoneNumber, message) => {
    client.messages.create({
        body: message,
        to: phoneNumber,  // Text this number
        from: twilioKey.phoneNumber // From a valid Twilio number
    }, function(err, message) {
        if(err) {
            console.error(err.message);
        }
    });
    console.log('sms sent');
};