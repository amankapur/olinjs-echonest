var echojs = require('echojs');

var echo = echojs({
  key: process.env.ECHONEST_KEY
});

// all the action goes down on the homepage

exports.display = function(req, res){
	res.render('homepage', {title: 'Welcome to Accapellizer'});
}

// find a song
// http://developer.echonest.com/docs/v4/song.html#search
exports.searchSong = function(req, res){
	echo('song/search').get({
		artist: req.body.artist_name,
		title: req.body.song_name
	}, function (err, json){
		console.log("Response to song query is: ", json.response);
	});
};
