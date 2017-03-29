import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';
 
export const Requests = new Mongo.Collection('requests');
 
Meteor.methods({
  'requests.insert'(type,name,number,address) {
 
    // Make sure the user is logged in (admin) before inserting a task
    //if (admin !== Meteor.userId()) {
    //  throw new Meteor.Error('not-authorized');
    //}

    Reports.insert({
      type : type,
      name : name,
      number : number,
      address : address,
      createdAt: new Date(),
    });
  },

  'requests.remove'(reqId) {

    const request = Requests.findOne(reqId);
 
    Requests.remove(reqId);
  },

  // 'requests.edit'(reqId,setType,setName,setNumber,setAddress) {
 	
 	//   const request = Requests.findOne(reqId);
 
  //   Requests.update(taskId, { $set: { type: setType } }, { $set: { name: setName } }, { $set: { number: setNumber } }, { $set: { address: setAddress } });
  // },

});