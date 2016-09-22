function alerta() {
    alert("Hello");
}

var kick = new Howl({
    src: ['kick.wav'],
    loop: true,
    speed: 2
});

var bass = new Howl({
    src: ['bass.wav'],
    loop: true
});

$('#status').click(function() {
    $(this).text('Changed');
    // alerta();
});

var playingKick = false;
var playingBass = false;
$("body").keydown(function(event) {
    $('#status').text(event.which);
    console.log('playing is ', playingKick, playingBass);
    if (event.which === 74) {
        if (!playingKick) {
            kick.volume(1);
            kick.play();
            playingKick = true;
        }
    }
    if (event.which === 70) {
        if (!playingBass) {
            bass.volume(1);
            bass.play();
            playingBass = true;
        }
    }

    kick.on('end', () => console.log('Psss!'));
    bass.on('end', () => console.log('Boom!'));

});

$("body").keyup(function(event) {
    $('#status').text(event.which);
    // console.log( "Handler for .keypress() called." );
    // alerta();
    if (event.which === 74) {
      playingKick = false;
      kick.stop();
      // kick.fade(1, 0, 200);
      // kick.on('fade', () => kick.stop());
    }
    if (event.which === 70) {
      playingBass = false;
      bass.fade(1, 0, 200);
      bass.on('fade', () => bass.stop());
    }
});
