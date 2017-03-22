import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { _ } from 'meteor/underscore'

import { Key } from '../../../misc/api-key.js'

const neaApiFetch = function(){
    const finalResult = {};
    let regionName = '';
    let regionValue = 0;
    let xmlResult = HTTP.get("http://api.nea.gov.sg/api/WebAPI/?dataset=psi_update&keyref=" + Key.nea);   
    let jsResult = xml2js.parseStringSync(xmlResult.content);
    // iterate for each region
    _.each(jsResult.channel.item[0].region, function(region){
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

const postPsi = function(jsonFetched){
    try {
        Meteor.call('psi.insert', jsonFetched.north, 
                              jsonFetched.central, 
                              jsonFetched.east,
                              jsonFetched.west,
                              jsonFetched.south);
    } catch (e) {
        console.log(e);
        return false;

    }
    return true;
}

Meteor.startup(() => {
    let jsonFetched = neaApiFetch();
    console.log(postPsi(jsonFetched))
})