
function alerta(){
alert("Hello");	
}

var sound = new Howl({
  src: ['kick.wav'],
  loop: true
});

$( '#status' ).click(function() {
  $( this ).text( 'Changed' );
  // alerta();
});

var playing = false;
$( "body" ).keydown(function(event) {
  $( '#status' ).text( event.which );
  // console.log( "Handler for .keypress() called." );
  // alerta();
  console.log('playing is ', playing);
  if(!playing){
  	sound.volume(1);
  	sound.play();
  	playing = true;
  }
sound.on('end', () => console.log('Boom!'));

});

$( "body" ).keyup(function(event) {
  $( '#status' ).text( event.which );
  // console.log( "Handler for .keypress() called." );
  // alerta();
  playing = false;
  sound.fade(1,0,200);
  sound.on('fade', () => sound.stop());
});



