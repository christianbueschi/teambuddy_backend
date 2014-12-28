module.exports = function (app) {

	// connect to mongolab =================

	var mongoose = require('mongoose');
		mongoose.connect('mongodb://admin:teambuddy2014@ds053529.mongolab.com:53529/teambuddy');
		//mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');

	var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback() {
			console.log('yay we are connected to mongolab!');
		});

	// define schemas =================

	var MemberSchema = new mongoose.Schema({
		firstName: String,
		lastName: String,
		email: String,
		position: String,
		phone: String,
		picture: String,
		number: String
	});

	var EventSchema = new mongoose.Schema({
		title: String,
		description: String,
		location: String,
		from: [Date],
		to: [Date]
	});

	var TeamSchema = new mongoose.Schema({
		name: String,
		description: String,
		members: [MemberSchema],
		events: [EventSchema]
	});

	// create models =================

	var member = mongoose.model('Member', MemberSchema),
		team = mongoose.model('Team', TeamSchema),
		event = mongoose.model('Event', EventSchema);

	return {
		memberModel: member,
		teamModel: team,
		eventModel: event
	};

}