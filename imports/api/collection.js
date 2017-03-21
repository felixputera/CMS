var Crisis = new Mongo.Collection('crisis');
var Shelter = new Mongo.Collection('shelter');
var Psi = new Mongo.Collection('psi');

CoordinateSchema = new SimpleSchema({
	latitude: {type: Number, decimal: true},
	longitude: {type: Number, decimal: true}
});

ReporterSchema = new SimpleSchema({
	name: {type: String},
	phone: {type: String}
});

ValuesSchema = new SimpleSchema({
	north: {type: Number},
	central: {type: Number},
	east: {type: Number},
	west: {type: Number},
	south: {type: Number}
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

Shelter.schema = new SimpleSchema({
	name: {type: String},
	type: {type: String},
	address: {type: String},
	postal_code: {type: Number},
	coordinates: {type: CoordinateSchema},
	region: {type: String}
});

Psi.schema = new SimpleSchema({
	time: {type: Date},
	values: {type: ValuesSchema}
});