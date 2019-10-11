import ValidURL from 'valid-url';
import Service from './Service.js';

import Clipboard from 'clipboard';

var App = (function() {
  var initialDiv = document.getElementById('initial');
  var afterDiv = document.getElementById('after');

  var copyButton = new Clipboard('#copy_button');

  var shortenButton = document.getElementById('shorten_button');
  var shortenAgainButton = document.getElementById('shorten_again_button');
  var linkInput = document.getElementById('link_input');

  var shortURL = document.getElementById('short_url');

  var isValidLink = function(url){
    return ValidURL.isUri(url);
  };

  return {

  copyButton: copyButton,
  shortenButton: shortenButton,
  shortenAgainButton: shortenAgainButton,

  handleShortenButtonClick: function(){
    var link = linkInput.value;

    if (link.trim() === '') {
      alert('Please enter a valid URL');
      return;
    }

    // Try to make a valid link by appending http://
    // If the link was found invalid
    if(!isValidLink(link)){
      link = 'http://' + link;
    }

    // Finally checking if the link is valid or not
    if(isValidLink(link)){
      linkInput.value = link;

      Service.processLink(link)
      .then((data)=>{
        initialDiv.style.display = 'none';
        afterDiv.style.display = 'block';

        shortURL.innerHTML = data.u;
        shortURL.href = data.u;
        ga('send', 'event', 'click', link, data.u)
      });
    }else{
      alert('Please enter a valid URL');
      ga('send', 'event', 'click', link, 'invalid')
    }
  },

  handleShortenAgainButtonClick: function(){
    initialDiv.style.display = 'flex';
    afterDiv.style.display = 'none';
    linkInput.value = "";
    ga('send', 'event', 'click', shortURL.href, 'shorten_again')
  },

  handleKeyDown: function(event) {
    if (event.keyCode == 13 /*enter*/) {
      App.handleShortenButtonClick();
    }
  },

  };
}());

// self executing function here
(function() {
  var body = document.querySelector('body');
  body.addEventListener('keydown', App.handleKeyDown);
  App.shortenButton.addEventListener("click", App.handleShortenButtonClick);
  App.shortenAgainButton.addEventListener("click", App.handleShortenAgainButtonClick);

  App.copyButton.on('success', function(e) {
    e.clearSelection();
  });

  App.copyButton.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });
})();
