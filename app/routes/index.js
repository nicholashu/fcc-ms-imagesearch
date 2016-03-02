'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {


	var clickHandler = new ClickHandler();

	app.route('/')
		.get( function (req, res) {
			res.sendFile(path + '/public/index.html');
		});



	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/imagesearch/')
		.get(clickHandler.getImages);
};
