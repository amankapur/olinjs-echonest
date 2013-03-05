function calculate_distances(a) {
  var num_segs_2 = track2.analysis.segments.length;
  var distance_matrix = [];
  var pitch_distances = [];
  var timbre_distances = [];
  var loudmax_distances = [];
  var pitch_diff, timbre_diff, loudmax_diff, indices;
  for (var b=0; b<num_segs_2; b++) {
    pitch_diff = numeric.sub(track2.analysis.segments[b].pitches, a.pitches);
    pitch_distances.push(numeric.norm2Squared(pitch_diff));
    timbre_diff = numeric.sub(track2.analysis.segments[b].timbre, a.timbre);
    timbre_distances.push(numeric.norm2Squared(timbre_diff));
    loudmax_diff = track2.analysis.segments[b].loudness_begin - a.loudness_begin;
    loudmax_distances.push(numeric.norm2Squared(loudmax_diff));
    indices.push(b);
  }
  distance_matrix.push(pitch_distances);
  distance_matrix.push(timbre_distances);
  distance_matrix.push(loudmax_distances);
  distance_matrix.push(indices);
  distance_matrix = normalize_distance_matrix(distance_matrix);
  return distance_matrix;
}