import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Psi = new Mongo.Collection('psi');

Psi.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Psi.schema = new SimpleSchema({
  time: {type: Date},
	values: { type: [Object], optional: true }
});

Crises.attachSchema(Psi.schema);
