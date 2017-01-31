// Find urls and change iframe base on it
function parseForUrls(text) {
  var urls = linkify.find(text);

  // Determine if valid
  var url;
  var text;
  var type = urls[0].type;
  if (urls === null) {
    text = 'Something went wrong!';
  } else if (urls.length === 0) {
    text = 'No links';
  } else if (urls.length === 1 && type != 'url') {
    text = `That's not a url, it's a ${type} link!`;
  } else if (urls.length > 1) {
    text = 'Too many urls';
  } else if (urls.length === 1 && urls[0].type == 'url') {
    url = urls[0].href;
    text = url;
    $('#preview').attr('src', url);
  }

  $('#url').text(text);
}

$('#urlinput').on('input', function() {
  parseForUrls((this).val());
});
