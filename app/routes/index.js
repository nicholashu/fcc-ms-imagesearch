'use strict';

var path = process.cwd();
var ImageSearch = require(path + '/app/controllers/imageSearch.server.js');

module.exports = function (app, passport) {


	var imageSearch = new ImageSearch();

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

	app.route('/api/imagesearch/:searchTerm?')
		.get(imageSearch.getImages);
		
	app.route('/api/latest/imagesearch')
		.get(imageSearch.getSearches);
};
