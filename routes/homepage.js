var echojs = require('echojs');
var request = require('request');
var models = require('./models');

var echo = echojs({
  key: process.env.ECHONEST_KEY
});


// all the action goes down on the homepage

exports.display = function(req, res){



  models.Segment.count({}, function(err, data){
    if (err) return console.log('error', err);
    console.log("COUNT ###############");
    console.log(data);
  });
	res.render('homepage', {title: 'Welcome to Acapellizer'});
}

exports.showSong = function(req, res){
  echo('song/search').get({
    artist: req.body.artist_name,
    title: req.body.song_name
  }, function (err, json){
    console.log("Response to song query is: ", json.response);
  });
};


// find a song
// http://developer.echonest.com/docs/v4/song.html#search
exports.searchSong = function(req, res){
  res.redirect('/acapellized');
	echo('song/search').get({
		artist: req.body.artist_name,
		title: req.body.song_name
	}, function (err, json){
    if (err) return console.log("error with song search", err);
		console.log("Response to song query is: ", json.response);
    var echoSong = json.response.songs[0];
    var echoSongID = echoSong.id;
    console.log(echoSongID);
    echo('song/profile').get({id: echoSongID, bucket: "audio_summary"}, function(err, profile){
      var track = profile.response.songs[0];
      var anal = track.audio_summary.analysis_url;
      request({url: anal, json:true}, function(error, response, data){
        //res.send(response.body.segments);
        //res.render('test-remix-js', {title: "Your Song, Acapellized!", song: req.body.song_name});
        // res.redirect('/acapellized');
      });
    });
	});
};

// testing out remix.js
exports.test_remixer = function(req, res){
  res.render('test-remix-js', {title: "Acapellized "});
}



