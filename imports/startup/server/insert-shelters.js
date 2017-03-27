import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Papa } from 'meteor/harrison:papa-parse';

import { Shelters } from '../../api/shelters/shelters.js';

Meteor.startup(() => {
    if (Shelters.find().count() === 0) {
        let shelterData = Papa.parse(Assets.getText("locations-of-bomb-shelters.csv"), {
            header: true,
            skipEmptyLines: true,
        });
        console.log('Inserting shelters data');
        _.each(shelterData.data, (entry) => {
            Meteor.call('shelters.insert',
                entry.name,
                entry.description,
                entry.address,
                entry.postal_code
            );
        });
        console.log('Finished inserting shelters data');
    }
});