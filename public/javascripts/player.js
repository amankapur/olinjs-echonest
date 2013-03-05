// Remix two tracks at once.
var apiKey = 'FILDTEOIK2HBORODV';
var trackID = 'TRZCSSX13D3839F62A'; //hey jude
var trackURL = '/songs/hey_jude.mp3'
var trackID2 = 'TRINGBD13D3B8B52B3'; //shamelessjude
var trackURL2 = '/songs/shamelessjude.mp3'

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
                    }
                });
            }
        });
    }
}

window.onload = init;