(function(window, document) {

  var gallery = new Gallery(document.getElementById("photo-grid"));
  window.g = gallery;
  gallery.searchImages("Travel City");
  document.body.addEventListener('keydown', function(e) {
    if (document.getElementById("photo-lighthouse").className.indexOf("active") == -1)
      return;

    switch (e.which) {
      case 27: //esc
        gallery.hideLighthouseImage();
        break;
      case 37: //left
        gallery.prevLighthouseImage()
        break;
      case 39: //right
        gallery.nextLighthouseImage()
        break;
    }
  })

  var searchbar = document.getElementById("gallery-search");
  var loading_icon = document.getElementById("gallery-loading-icon");
  var searchValue = ''
  var timer;

  function searchImages(value) {
    if (value != searchValue) {
      loading_icon.setAttribute('style', "display: block" );
      searchValue = value;
      gallery.searchImages(value);
      // lol fake loading icon
      setTimeout(function() {loading_icon.setAttribute('style', "display: none" );}, 1000)
    }
  }

  searchbar.addEventListener('keyup', function() {
    clearInterval(timer);
    timer = setTimeout(function() {
      searchImages(this.value)
    }.bind(this), 500)
  })


})(window, document);
