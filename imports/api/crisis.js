var Crisis = new Mongo.Collection('crisis');

CoordinateSchema = new SimpleSchema({
	latitude: {type: Number, decimal: true},
	longitude: {type: Number, decimal: true}
});

ReporterSchema = new SimpleSchema({
	name: {type: String},
	phone: {type: String}
});

Crisis.schema = new SimpleSchema({
	time: {type: Date},
	region: {type: String},
	address: {type: String},
	postal_code: {type: Number},
	coordinates: {type: CoordinateSchema},
	type: {type: String},
	description: {type: String},
	reporter: {type: ReporterSchema},
	input_by: {type:SimpleSchema.RegEx.Id}
});

console.log('Crisis Imported!');

export default Crisis;