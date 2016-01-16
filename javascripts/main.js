(function(window, document) {

  var gallery = new Gallery(document.getElementById("photo-grid"));
  window.g = gallery;
  gallery.searchImages("Travel City");
  document.body.addEventListener('keydown', function() {
    gallery.hideLighthouseImage();
  })


})(window, document);
