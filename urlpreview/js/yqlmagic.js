// Grabbed from:
// http://stackoverflow.com/questions/6666423/overcoming-display-forbidden-by-x-frame-options
// TODO: Understand how this works...
// TODO: Retrieve static images which seem to fail to load, e.g. google.com
function getData(data) {
  if (data && data.query && data.query.results && data.query.results.resources && data.query.results.resources.content && data.query.results.resources.status == 200) {
    // Worked
    loadHTML(data.query.results.resources.content);
  } else if (data && data.error && data.error.description) {
    // Errored
    loadHTML(data.error.description);
  } else {
    // Unexpected
    loadHTML('Error: Cannot load ' + url);
  }
};

function loadURL(url) {
  var script = document.createElement('script');
  script.src = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20data.headers%20where%20url%3D%22'
    + encodeURIComponent(url)
    + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=getData';
  document.body.appendChild(script);
};

function loadHTML(html) {
  var iframe = $('#preview')[0];
  iframe.src = 'about:blank';
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(
    html.replace(
      /<head>/i,
      '<head><base href="' + url + '"><scr' + 'ipt>document.addEventListener("click", function(e) { if(e.target && e.target.nodeName == "A") { e.preventDefault(); parent.loadURL(e.target.href); } });</scr' + 'ipt>'));
  iframe.contentWindow.document.close();
} 
