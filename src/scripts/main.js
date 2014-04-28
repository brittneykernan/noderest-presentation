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

if(document.body.style.opacity == 0) {
   setTimeout(function() {
      document.body.style.opacity = 1
    },650);
}

var terminal = document.getElementById('terminal');
var lis = terminal.getElementsByTagName('li');
var liIndx = 0;

deck.on('activate', function(e) {
  // fade in

  updateFolder(e);
  console.log('cur index',e.index)
  updateTerminal(e)
  
});

function updateFolder(e) {
  var step = 0, term = 0;
  if( e.index < 4 ) 
    step = 0;
  else if( e.index < 8 ) {
    step = 1; 
  } else if( e.index < 10 ) {
    step = 2 
  } else if ( e.index < 14 ){
    step = 3
  } else if ( e.index < 17 ){
    step = 0
  } else if ( e.index < 18 ) {
    step = 4   
  } else if ( e.index < 27 ) {
    step = 5   
  } else {
    step = 6
  } 

  if(step > 0)
    document.body.className = 'folders-open-' + step 
  else
    document.body.className = '' 
}

function updateTerminal(e) {

  if( e.index > 4 && lis[1].style.display != 'block') {
    terminal.className = 'show-term'

    showNextLi()
    setTimeout(function() {
      showNextLi()
    }, 500);
  }

  if( e.index > 5 && lis[2].style.display != 'block') {
    showNextLi()
  }

  if( e.index > 8 && lis[3].style.display != 'block') {
    showNextLi()
  }

  if( e.index > 9 && lis[6].style.display != 'block') {
    var timing = (e.index == 10) ? 250: 0;

    setTimeout(function() {
      showNextLi()
      window.term = setInterval(function() {
        showNextLi()
        if( liIndx > 19 ) 
          window.clearInterval(window.term)
     }, timing);
    }, 1000)
  }

  if( e.index > 11 && lis[20].style.display != 'block') {
    showNextLi();
    setTimeout(function() {
      showNextLi()
    }, 500)
  }

  if( e.index > 19 && lis[22].style.display != 'block') {
    showNextLi();
    setTimeout(function() {
      showNextLi()
      setTimeout(function() {
        showNextLi()
      }, 500)
    }, 500)
  }

  if( e.index > 22  && lis[26].style.display != 'block') {
    showNextLi();   
    setTimeout(function() {
      showNextLi()
    }, 500) 
  }

  if( e.index > 23  && lis[28].style.display != 'block') {
    showNextLi();   
  }

  if( e.index > 24  && lis[29].style.display != 'block') {
    setTimeout(function() {
      showNextLi()
      window.term = setInterval(function() {
        showNextLi()
        if( liIndx > 45 ) 
          window.clearInterval(window.term)
     }, timing);
    }, 1000)
  }

  if( e.index > 27  && lis[46].style.display != 'block') {
    showNextLi()
    setInterval(function() {
      showNextLi()
     }, 500);
  }

}

function showNextLi() {
  console.log('showing',liIndx)
  lis[liIndx].style.display = 'block';
  liIndx ++ 
  terminal.scrollTop = terminal.scrollHeight;
}


try{Typekit.load();}catch(e){}      