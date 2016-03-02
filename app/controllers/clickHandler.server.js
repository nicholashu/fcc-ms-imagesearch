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
		api500px.photos.searchByTerm(req.params.searchTerm, {'sort': 'rating', 'rpp': req.query.offset},  function(error, results) {
		  if (error) {
		    // Error! 
		    return;
		  }
		 var imageArray = [];
		 results.photos.forEach(function(photo){
		 	var temp = {
		 		name:	photo.name,
		 		image_url: photo.image_url
		 	};
		 	imageArray.push(temp);
		 })
		 res.json(imageArray); 
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
