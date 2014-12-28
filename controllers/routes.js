module.exports = function (app) {

	var xtcPath = app.get('xtcPath')
		, cfg = require(app.xtcPath('lib/configure')).get()
		, helpers = app.xtc.helpers
		, authBasic = helpers.authBasic
		;

	// Example: password protect the whole site (to set credentials: see _config/config-secret.json)
	// app.all('*', authBasic('user'), function(req, res, next) { next('route'); });


	/**
	 * project routes
	 */

	var index = require('./index')(app);

	var	mongoose = require('./model')(app),
		TeamModel = mongoose.teamModel,
		MemberModel = mongoose.memberModel,
		EventModel = mongoose.eventModel;

	app.get('/', index.home);
	app.get('/team', index.teams);
	app.get('/members', index.members);




	// Example: password protect a route (to set credentials: see _config/config-secret.json)
	// app.get('/admin', authBasic('admin'), index.admin);

	// Catch-all routes: If no defined route matches but the URI path matches a view name, that view is rendered.
	// If nothing matches, the final xtc middleware `helpers.render404` is called, which renders the 404 view.



	// API
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// TEAM

	var _this = this;

	// get all teams
	app.get('/api/teams', function (req, res) {
		_this.getTeams(res);
	});

	// create team and send back all teams after creation
	app.post('/api/teams', function (req, res) {

		var team = new TeamModel( {
			name: req.body.name,
			description: req.body.description
		})

		team.save(function (err) {
			if (err)
				console.log ('Error on team save!');
			_this.getTeams(res);
		});
	});

	// delete a team
	app.delete('/api/teams/:team_id', function (req, res) {
		TeamModel.remove({
			_id: req.params.team_id
		}, function (err, team) {
			if (err)
				res.send(err)

			_this.getTeams(res);
		});
	});


	// MEMBERS

	// create member and send back all teams after creation
	app.post('/api/members/:team_id', function(req, res) {

		var member = new MemberModel( {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			position: req.body.position,
			phone: req.body.phone
		}),
			idTeam = req.params.team_id,
			update = { $push: {members: {
				firstName: member.firstName,
				lastName: member.lastName,
				email: member.email,
				position: member.position,
				phone: member.phone
				}
			}},
			options = console.log('create member');

		_this.updateTeam(idTeam, update, options, res);

	});

	// delete a member
	app.delete('/api/members/:team_id/:member_id', function (req, res) {

		var idMember = req.params.member_id,
			idTeam = req.params.team_id,

			update = { $pull: {members: {_id: idMember }}},
			options = console.log('delete member');

		_this.updateTeam(idTeam, update, options, res);

	});


	// EVENTS

	// create event and send back all teams after creation
	app.post('/api/events/:team_id', function(req, res) {

			console.log(req.params);
		var event = new EventModel( {
				title: req.body.title,
				description: req.body.description,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to
			}),
			idTeam = req.params.team_id,
			update = { $push: {events: {
				title: event.title,
				description: event.description,
				location: event.location,
				from: event.from,
				to: event.to
			}
			}},
			options = console.log('create event');

		console.log(event);

		_this.updateTeam(idTeam, update, options, res);

	});

	// delete an event
	app.delete('/api/events/:team_id/:event_id', function (req, res) {

		var idEvent = req.params.event_id,
			idTeam = req.params.team_id,

			update = { $pull: {events: {_id: idEvent }}},
			options = console.log('delete event');

		_this.updateTeam(idTeam, update, options, res);

	});


	// HELPER ACTIONS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// get all teams saved in collection teambuddy
	this.getTeams = function(res) {
		TeamModel.find(function(err, teams) {
			if (err)
				res.send(err)
			res.json(teams);
		});
	};

	// update TeamModel
	this.updateTeam = function(id, update, options, res) {
		TeamModel.findByIdAndUpdate(id, update, options, function(err, result) {
			if (err) console.log(err);
			_this.getTeams(res);
		});
	}


};
