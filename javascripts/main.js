(function(window, document) {

  var gallery = new Gallery(getGridContainers(), getLighthouseContainers(), document.getElementById("gallery-load-more"));
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
    if (value && value != searchValue) {
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
  });


    function getLighthouseContainers() {
    return {
      main_container: document.getElementById("photo-lighthouse"),
      image_text_container: document.getElementById('photo-lighthouse-display-text'),
      image_containers: document.getElementsByClassName('photo-lighthouse-display-image'),
      next_image_button: document.getElementById("photo-lighthouse-next"),
      prev_image_button: document.getElementById("photo-lighthouse-prev"),
      close_image_button: document.getElementById("photo-lighthouse-close"),
      overlay: document.getElementById("photo-lighthouse-overlay")
    }
  }

  function getGridContainers() {
    return {
      photos_container: document.getElementById("photo-grid")
    }
  }



})(window, document);
