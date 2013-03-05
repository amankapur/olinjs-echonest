from pyechonest import track, config
import requests
import json
import os


mongo_url = 'https://api.mongolab.com/api/1/databases/echonest/collections/acapella2?apiKey=a4-xIcHUAl_iBb9iqoq8pClCmk2DplxI'
path = './audio'
config.ECHO_NEST_API_KEY="LKME7OQAVE5RXMYGG"

headers = {'content-type': 'application/json'}

for file_name in os.listdir(path):
	print "SONG " + file_name
	if file_name.endswith('.mp3'):
		file_path = './audio/' + file_name
		song = track.track_from_filename(file_path, force_upload=True)

		params = {}
		params['song_name'] = file_name
		params['id'] = song.id
		for segment in  song.segments:
			params['timbre'] = segment.timbre
			params['pitch'] = segment.pitch
			params['duration'] = segment.duration
			params['loudness_start'] = segment.loudness_start
			params['loudness_max_time'] = segment.loudness_max_time
			params['loudness_max'] = segment.loudness_max

			requests.post(mongo_url, data=json.dumps(params), headers= headers)

