var Psi = new Mongo.Collection('psi');

ValuesSchema = new SimpleSchema({
	north: {type: Number},
	central: {type: Number},
	east: {type: Number},
	west: {type: Number},
	south: {type: Number}
});

Psi.schema = new SimpleSchema({
	time: {type: Date},
	values: {type: ValuesSchema}
});

console.log('Psi Imported!');

export default Psi;