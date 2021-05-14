// html5media enables <video> and <audio> tags in all major browsers

// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent',  navigator.userAgent);
b.setAttribute('data-platform', navigator.platform );

// HTML5 audio player + playlist controls...
jQuery(function ($) {
    var supportsAudio = !! document.createElement('audio').canPlayType;
    
    if (supportsAudio) {
        // Track name variables initialization
        var trackname0 = "";
        var trackname1 = "";
        var trackname2 = "";
        var trackname3 = "";
        var trackname4 = "";
        var trackname5 = "";
        var trackname6 = "";
        
        var index = 0,
        playing = false;
        //mediaPath = 'https://archive.org/download/mythium/',
        extension = '',
        tracks = [{
            "track": 1,
            "name": "You Can Dream",
            "file": "music/2020/you_can_dream"
        }, {
            "track": 2,
            "name": "Movin' On",
            "file": "music/2020/movin_on"
        }, {
            "track": 3,
            "name": "Ellie Mae",
            "file": "music/2020/ellie_mae_cello"
        }, {
            "track": 4,
            "name": "I'll Find Myself In You",
            "file": "music/2020/i'll_find_myself_in_you"
        }, {
            "track": 5,
            "name": "Abbey's Sonata 2",
            "file": "music/2020/abbeys_sonata"
        }, {
            "track": 6,
            "name": "Elliana",
            "file": "music/2020/elliana"
        }
        ],
        // Populate track names. Index starts with 0. MyTrack starts with 1.
        trackname0 = tracks[0].name,
        $("#MyTrack1").html(trackname0),
        trackname1 = tracks[1].name,
        $("#MyTrack2").html(trackname1),
        trackname2 = tracks[2].name,
        $("#MyTrack3").html(trackname2),
        trackname3 = tracks[3].name,
        $("#MyTrack4").html(trackname3),
        trackname4 = tracks[4].name,
        $("#MyTrack5").html(trackname4),
        trackname5 = tracks[5].name,
        $("#MyTrack6").html(trackname5),


        trackCount = tracks.length,
        npAction = $('#npAction'),
        npTitle = $('#npTitle'),
        audio = $('#audio1').bind('play', function () {
            playing = true;
            npAction.text('Now Playing...');
        }).bind('pause', function () {
            playing = false;
            npAction.text('Paused...');
        }).bind('ended', function () {
            npAction.text('Paused...');
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                audio.play();
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }).get(0),
        btnPrev = $('#btnPrev').click(function () {
            if ((index - 1) > -1) {
                index--;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        btnNext = $('#btnNext').click(function () {
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        li = $('#plList li').click(function () {
            var id = parseInt($(this).index());
            if (id !== index) {
                playTrack(id);
            }
        }),
        loadTrack = function (id) {
            $('.plSel').removeClass('plSel');
            $('#plList li:eq(' + id + ')').addClass('plSel');
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = tracks[id].file + extension;
            // audio.src = mediaPath + tracks[id].file + extension;
        },
        playTrack = function (id) {
            loadTrack(id);
            audio.play();
        };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});