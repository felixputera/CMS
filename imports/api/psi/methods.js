import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'
import { _ } from 'meteor/underscore'

import { Psi } from './psi.js';
import '../../utils/sms-sender.js';

const neaKey = JSON.parse(Assets.getText("api-key.json")).nea;

Meteor.methods({
    'psi.fetch'(north, central, east, west, south) {
        let jsonFetched = neaApiFetch();
        _.each(jsonFetched, (regionVal, region) => {
            if (regionVal >= 150)
                sendAlert(region, regionVal);
        });
        Psi.insert({
            time: new Date(),
            north: jsonFetched.north,
            central: jsonFetched.central,
            east: jsonFetched.east,
            west: jsonFetched.west,
            south: jsonFetched.south,
        });
        
    },
})

const neaApiFetch = function(){
    const finalResult = {};
    let regionName = '';
    let regionValue = 0;
    let xmlResult = HTTP.get("http://api.nea.gov.sg/api/WebAPI/?dataset=psi_update&keyref=" + neaKey);   
    let jsResult = xml2js.parseStringSync(xmlResult.content);
    // iterate for each region
    _.each(jsResult.channel.item[0].region, (region) => {
        regionName = convertCodeToName(region.id[0]);
        // we dont need overall psi
        if (regionName){
            _.each(region.record[0].reading, function(reading){
                if(reading.$['type'] === 'NPSI'){   
                    regionValue = reading.$['value'];
                    finalResult[regionName] = regionValue;

                }
            });
        };
    });
    return finalResult;
    
}

const convertCodeToName = (code) =>
  code === 'rNO' ? 'north' :
  code === 'rCE' ? 'central' :
  code === 'rEA' ? 'east' :
  code === 'rWE' ? 'west' :
  code === 'rSO' ? 'south' :
  null

const sendAlert = (regionArea, regionPsi) => {
    let message = "[HIGH PSI ALERT] PSI in your area has reached " + regionPsi + ". You are advised to stay indoors.";
    sendSMS(regionArea, message);
}