'use strict';

var Users = require('../models/users.js');
var API500px = require('500px'),
    api500px = new API500px('HDuQNNnsZrvUIoRLOBpMmnFsQjYJFhMu1Tu041Lf');

function ClickHandler () {

	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.getImages = function (req, res) {
		api500px.photos.getPopular({'sort': 'created_at', 'rpp': '10'},  function(error, results) {
		  if (error) {
		    // Error! 
		    return;
		  }
		 
		 res.json(results); 
		});
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

}

module.exports = ClickHandler;
