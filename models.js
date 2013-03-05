var mongoose = require('mongoose');

mongoose.connect("mongodb://app:sexybitch@ds043467.mongolab.com:43467/echonest/acapella");

var SegmentSchema = new mongoose.Schema({}, {strict: false});

var segment = new mongoose.model('Segment', SegmentSchema);

exports.segment = segment;
