import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

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
                entry.postal_code,
                'undefined'
            );
        });
        console.log('Finished inserting shelters data');
    }
});