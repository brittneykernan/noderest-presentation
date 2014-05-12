var deck = bespoke.from('article', {
  keys: true,
  touch: true,
  bullets: '.bullet',
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
var terminalList = document.getElementById('terminal-list');

var liQueue = [];
var curSlide = 0;
var loadingSlide = 0;

deck.on('activate', function(e) {

  updateFolder(e);
  curSlide = e.index;

  if(curSlide == 5)
    terminal.className = 'show-term';

  var lis = getSlideLis(e.slide)
  if(lis) {  
    loadingSlide = e.index;
    liQueue = liQueue.concat(lis)

    showNextLi()
  }  
});

function getSlideLis(slide) {
  var ul = slide.getElementsByClassName('for-terminal');
  if( ul != undefined && ul[0] != undefined ) 
    return Array.prototype.slice.call( ul[0].children );
  else return false;
}

var waitingToAdd = null;
function showNextLi() {

  var li = liQueue.shift();
  if(li == undefined)
    return false;
  var clone = document.createElement("li");
  clone.innerHTML = li.innerHTML;
  terminalList.appendChild(clone);
  
  terminal.scrollTop = terminal.scrollHeight;

  // add next child
  var wait = ( curSlide == loadingSlide ) ? 320 : 0;
  setTimeout(showNextLi,wait)
}

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
  } else if ( e.index < 47 ) {
    step = 6
  } else {
    step = 0
  } 

  if(step > 0)
    document.body.className = 'folders-open-' + step 
  else
    document.body.className = '' 
}

try{Typekit.load();}catch(e){}      