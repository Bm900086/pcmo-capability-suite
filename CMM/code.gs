function doGet(e) {
  // Create and serve the HTML template from the file named 'index.html'
  var html = HtmlService.createTemplateFromFile('index.html');

  // Serve the HTML
  return html.evaluate()
    .setTitle('Capability Assessment Tool') // Set the browser tab title
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL) // Allows embedding if needed
    .addMetaTag('viewport', 'width=device-width, initial-scale=1'); // For mobile responsiveness
}