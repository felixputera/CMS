var Shelter = new Mongo.Collection('shelter');

CoordinateSchema = new SimpleSchema({
	latitude: {type: Number, decimal: true},
	longitude: {type: Number, decimal: true}
});


Shelter.schema = new SimpleSchema({
	name: {type: String},
	type: {type: String},
	address: {type: String},
	postal_code: {type: Number},
	coordinates: {type: CoordinateSchema},
	region: {type: String}
});

console.log('Shelter Imported!');

export default Shelter;