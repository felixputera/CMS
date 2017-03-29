import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Sms = new Mongo.Collection('sms');

Sms.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Sms.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  phoneNumber: { type: String },
  region: { type: String }
});

Sms.attachSchema(Sms.schema);
