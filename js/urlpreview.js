// Find urls and change iframe base on it
function parseForUrls(text) {
  var urls = linkify.find(text);

  // Determine if any links
  if (urls === null || urls.length === 0) {
    $('#url').text('No links');
    return;
  }

  // Determine if valid
  var text;
  var type = urls[0].type;
  if (urls.length === 1 && type != 'url') {
    text = `That's not a url, it's a ${type} link!`;
  } else if (urls.length > 1) {
    text = 'Too many urls';
  } else if (urls.length === 1 && urls[0].type == 'url') {
    var url = urls[0].href;
    text = url;
    //$('#preview').attr('src', url);
    loadURL(url);
  }

  $('#url').text(text);
}

// Finally add listener to input box, waiting for a pause to load url
var typingTimeout;
$('#urlinput').on('input', function() {
  // Loads only if 250 ms has passed
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => { // Wide arrow function to preserve 'this'
    parseForUrls($(this).val());
  }, 250);
});
