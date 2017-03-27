import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Shelters = new Mongo.Collection('shelters');

Shelters.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Shelters.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String },
	type: { type: String },
	address: { type: String },
	postalCode: { type: String },
	latitude: { type: Number, decimal: true },
  longitude: { type: Number, decimal: true },
	region: { type: String }
});

Shelters.attachSchema(Shelters.schema);
