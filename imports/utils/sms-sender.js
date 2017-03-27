import { Meteor } from 'meteor/meteor';

import { Sms } from './sms.js';



var twilio = require('twilio');

// Find your account sid and auth token in your Twilio account Console.
var client = twilio('AC57c5ef6c2e8c6ed495d5675b577fc369', '73007e7d99d9c42308bd2446a431e6ae');


Meteor.methods({
    
    'sendSms': function(regionArea, address, type, description){
        let phoneNumbers = Sms.find({region: regionArea});
        let message = "[INCIDENT IN YOUR AREA] A " + type + " just happened at " + address + ". " + description;
        phoneNumbers.forEach(function (num){
            client.sendMessage({
                to: num.phoneNumber.toString(),
                from: '+61439071940',
                body: message
            });

        });
    }

});