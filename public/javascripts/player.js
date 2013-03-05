// Remix two tracks at once.
var apiKey = 'FILDTEOIK2HBORODV';
var trackID = 'TRCYWPQ139279B3308';
var trackURL = '/songs/1451_-_D.mp3'
var trackID2 = 'TRNPPUD13D09329844';
var trackURL2 = '/songs/TRNPPUD13D09329844.mp3'

var remixer;
var player;
var track;
var track2;
var remixed;

function init() {
    $('.btn').attr('disabled','disabled');
    var wavesurfer = Object.create(WaveSurfer);
    wavesurfer.init({
        canvas: document.querySelector('#waveCanvas'),
        waveColor: '#888888',
        progressColor: '#000000',
        loadingColor: '#000000',
        cursorColor: '#888888'
    });

    var wavesurfer2 = Object.create(WaveSurfer);
    wavesurfer2.init({
        canvas: document.querySelector('#waveCanvas2'),
        waveColor: '#888888',
        progressColor: '#000000',
        loadingColor: '#000000',
        cursorColor: '#888888'
    });
    
    var remixedWavesurfer = Object.create(WaveSurfer);
    remixedWavesurfer.init({
        canvas: document.querySelector('#RemixedWaveCanvas'),
        waveColor: '#00ACEB',
        progressColor: '#000000',
        loadingColor: '#000000',
        cursorColor: '#00ACEB'
    });

    if (window.webkitAudioContext === undefined) {
        error("Sorry, this app needs advanced web audio. Your browser doesn't"
            + " support it. Try the latest version of Chrome");
    } else {
        var context = new webkitAudioContext();
        var fs;
        // Only use the filesystem if we have access to it.
        if (window.File && window.FileReader && window.FileList && window.Blob && window.webkitRequestFileSystem) {
            window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
            window.requestFileSystem(window.TEMPORARY, 1024*1024, function(filesystem) {
                fs = filesystem;
            }, fileErrorHandler);
        }

        remixer = createJRemixer(context, $, apiKey);
        player = remixer.getPlayer();
        $("#info").text("Loading analysis data...");

        remixer.remixTrackById(trackID, trackURL, function(t, percent) {
            track = t;
            $("#info").text(percent + "% of the first track loaded...");
            if (percent == 100) {
                $("#info").text(percent + "% of the first track loaded, checking status and preparing for second track...");
            }

            if (track.status == 'ok') {
                wavesurfer.loadBuffer(track.analysis.beats);

                remixer.remixTrackById(trackID2, trackURL2, function(t, percent) {
                    track2 = t;
                    $("#info").text(percent + "% of the second track loaded...");
                    if (percent == 100) {
                        $("#info").text(percent + "% of both tracks loaded, remixing...");
                    }

                    if (track2.status == 'ok') {
                        wavesurfer2.loadBuffer(track2.analysis.beats);
                        $('.btn-original').removeAttr('disabled');
                        // Extract the first and third beats of track 1 with the second and fourth beats of track 2.
                        remixed = new Array();
                        var meter = parseInt(track.analysis.track.time_signature);
                        var numberOfBeats = Math.min(track.analysis.beats.length, track2.analysis.beats.length);
                        for (var i=0; i < numberOfBeats; i++) {
                            if (i % meter == 0 || i % meter == 2) {
                                remixed.push(track.analysis.beats[i])
                            } else if (i % meter == 1 || i % meter == 3) {
                                remixed.push(track2.analysis.beats[i])
                            }
                        }
                        $("#info").text("Remix complete!");
            
                        remixedWavesurfer.loadBuffer(remixed);

                        // Only use the filesystem if we have access to it.
                        if (fs) {
                            remixer.saveRemixLocally(fs, remixed, function(saveURL) {
                                $('#downloadButton').html('<a href="' + saveURL + '" target="_blank">Download Remix</a>')
                            });
                        }
                        $('.btn-remixed').removeAttr('disabled');

                    }
                });
            }
        });
    }
}

window.onload = init;