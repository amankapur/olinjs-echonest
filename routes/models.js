var mongoose = require('mongoose');

mongoose.connect("mongodb://app:sexybitch@ds043467.mongolab.com:43467/echonest", function(err){
	if(err) return console.log(err);
});

// mongoose.connect('localhost');

var segmentSchema = mongoose.Schema({
	'timbre': [Number],
	'song_name': String,
	'pitches': [Number],
	'loudness_max_time': Number,
	'loudness_start_time': Number,
	'loudness_max': Number,
	'duration': Number, 
	'trackId': String
}, {'strict': false});

var segment = mongoose.model('Segment', segmentSchema);

exports.Segment = segment;




// var schema = mongoose.Schema({ name: 'string' });
// var Cat = mongoose.model('Cat', schema);

// exports.Cat = Cat;
