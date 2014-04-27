var deck = bespoke.from('article', {
  keys: true,
  touch: true,
  bullets: 'li, .bullet',
  scale: true,
  hash: true,
  progress: true,
  state: true,
  forms: true
});

var off = deck.on('activate', function(e) {
  // fade in
  if(document.body.style.opacity == 0)
     setTimeout(function() {
        document.body.style.opacity = 1
      },650);

  console.log(e.index)

  var bodyClass = '';
  if( e.index < 5 ) 
    bodyClass = '';
  else if( e.index < 8 ) {
    bodyClass = 'folders-open-1' 
  } else if( e.index < 10 ) {
    bodyClass = 'folders-open-2' 
  } else if ( e.index < 16 ){
    bodyClass = 'folders-open-3'
  } else if ( e.index < 17 ) {
    bodyClass = 'folders-open-4'    
  } else {
    bodyClass = 'folders-open-5' 
  } 

  document.body.className = bodyClass
  
  
});


try{Typekit.load();}catch(e){}      