'use strict';

var Searches = require('../models/searches.js');
var API500px = require('500px'),
    api500px = new API500px('HDuQNNnsZrvUIoRLOBpMmnFsQjYJFhMu1Tu041Lf');

function imageSearch () {

	this.getSearches = function (req, res) {
		Searches
			.find()
			.limit(10)
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};

	this.getImages = function (req, res) {
		var length;
		if(req.query.offset){
			length = req.query.offset;
		}else{
			length = 20;
		};
		
	 var newSearch = new Searches({
          term: req.params.searchTerm
        });
      newSearch.save();

		api500px.photos.searchByTerm(req.params.searchTerm, {'sort': 'rating', 'rpp': length},  function(error, results) {
		  if (error) {
		    // Error! 
		    return;
		  }
		 var imageArray = [];
		 results.photos.forEach(function(photo){
		 	var temp = {
		 		alt:	photo.name,
		 		image_url: photo.image_url,
		 		link: 'https://500px.com/' + photo.url
		 	};
		 	imageArray.push(temp);
		 })
		 res.json(imageArray); 
		});
	};


}

module.exports = imageSearch;
