from pyechonest import track, config
from restclient import POST
import json
import os


mongo_url = 'https://api.mongolab.com/api/1/databases/echonest/collections/acapella2?apiKey=a4-xIcHUAl_iBb9iqoq8pClCmk2DplxI'
path = './audio'
config.ECHO_NEST_API_KEY="LKME7OQAVE5RXMYGG"


for file_name in os.listdir(path):
	if file_name.endswith('.mp3'):
		file_path = './audio/' + file_name
		song = track.track_from_filename(file_path, force_upload=True)

		params = {}
		params['id'] = song.id
		params['segments'] = song.segments
		params['tempo'] = song.tempo
		params['beats'] = song.beats
		params['analysis_url'] = song.analysis_url


		print 'POSTING ' + file_name


		#POST(mongo_url, json.dumps(params))