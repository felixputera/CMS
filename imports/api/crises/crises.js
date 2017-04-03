import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Crises = new Mongo.Collection('crises');

Crises.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Crises.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    time: { type: Date },
    hour: { type: Number, optional: true  },
    region: { type: String },
    address: { type: String },
    postalCode: { type: String, optional: true },
    unitNumber: { type: String, optional: true },
    latitude: { type: Number, decimal: true },
    longitude: { type: Number, decimal: true },
    type: { type: String },
    description: { type: String },
    userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
    assistance: { type: Boolean },
    assistanceType: { type: String, optional: true },
    resolved: { type: Boolean },
});

Crises.attachSchema(Crises.schema);
