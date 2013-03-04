require 'rest-client'
require 'json'

MONGO_KEY = 'a4-xIcHUAl_iBb9iqoq8pClCmk2DplxI'
ECHO_KEY = 'LKME7OQAVE5RXMYGG'

mongo_url = 'https://api.mongolab.com/api/1/databases/echonest/collections/acapella'

echo_url = 'http://developer.echonest.com/api/v4/'

acapella_url = echo_url + 'song/search?api_key=' + ECHO_KEY + '&format=json&style=acapella'

acapella_search = JSON(RestClient.get acapella_url)

#puts acapella_search

acapella_songs = acapella_search['response']['songs']

#puts acapella_songs

puts acapella_songs

acapella_songs.each do |song|

	song_id = song['id']
	


	song_url= echo_url + 'song/profile?api_key=' + ECHO_KEY + '&format=json&id=' + song_id + '&bucket=audio_summary'
	song_data = JSON(RestClient.get song_url)
	analysis_url = song_data['response']['songs'][0]['audio_summary']['analysis_url']
	
	song_segments = JSON(RestClient.get analysis_url)['segments']

	song_segments.each do |segment|
		# deltaT  = segment['duration']
		# pitch = segment['pitches']
		# timbre = segment['timbre']

		# puts segment
		
		# return
	end
	
	# return

end

