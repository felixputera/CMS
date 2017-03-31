import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Crises } from  '../crises/crises.js';
import { Psi } from  '../psi/psi.js';

let currentPsi = Psi.findOne({}, {sort: {time: -1, limit: 1}});

const printPsi = () => {
    let textOutput;
    textOutput = '\n PSI Updates (as of ' + currentPsi.time + ' )\n';
    textOutput = textOutput + 'North: ' + currentPsi.north + '\n';
    textOutput = textOutput + 'Central: ' + currentPsi.central + '\n';
    textOutput = textOutput + 'East: ' + currentPsi.east + '\n';
    textOutput = textOutput + 'West: ' + currentPsi.west + '\n';
    textOutput = textOutput + 'South: ' + currentPsi.south + '\n';
    return textOutput;
};

const printSingleCrisis = (crisis) => {
  let textOutput;
  textOutput = 'Type: ' + crisis.type + ', Region: ' + crisis.region +
      ', Address: ' + crisis.address + ', Reported time: ' + crisis.time;
  return textOutput;
};

Meteor.methods({
    'pmReport'(){
        let  textOutput;
        textOutput = 'Crisis Management System 30-minute Report \n';
        textOutput = textOutput + printPsi();
        textOutput = textOutput + '\n Unresolved Accidents \n';

        let unresolvedCrises = Crises.find({resolved: false}, {sort: {region: 1}}).fetch();
        _.each(unresolvedCrises, (crisis) => {
            if (crisis) {
                textOutput = textOutput + printSingleCrisis(crisis);
            }
        });

        return textOutput;
    },
    'socMedReport'(){
        let  textOutput;
        textOutput = 'Hourly Update \n';
        textOutput = textOutput + printPsi();
        textOutput = textOutput + '\n Accidents Happened Last Hour \n';

        let now = new Date;
        let pastHourCrises = Crises.find({hour: now.getHours()}, {sort: {region: 1}}).fetch();
        _.each(pastHourCrises, (crisis) => {
            if(crisis) {
                textOutput = textOutput + printSingleCrisis(crisis);
            }
        });

        return textOutput;

    }
});