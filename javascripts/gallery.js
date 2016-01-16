(function(window, document) {

  'use strict';

  function Gallery(gridContainer, lighthouseContainers) {
    this.gridContainer = gridContainer;
    this.lighthouse = new LightHouse(getLighthouseContainers(), this.hideLighthouseImage.bind(this));
    this.grid = new Grid(this.gridContainer, this.showLighthouseImage.bind(this));
    this.photos = [];
    this.queryText = '';
  }

  Gallery.prototype.showLighthouseImage = function(e, index) {
    this.lighthouse.showPhotoAtIndex(index);
    this.grid.hidePhotos();
  }

  Gallery.prototype.hideLighthouseImage = function() {
    this.lighthouse.close();
    this.grid.showPhotos();
  }

  Gallery.prototype.nextLighthouseImage = function() {
    this.lighthouse.showNextPhoto();
  }

  Gallery.prototype.prevLighthouseImage = function() {
    this.lighthouse.showPrevPhoto();
  }

  Gallery.prototype.searchImages = function(queryText) {
    this.grid.reset();
    this.lighthouse.reset();
    this.queryText = queryText;
    this.loadImages(this.queryText);
  }

  Gallery.prototype.loadImages = function(queryText) {
    this.queryText = queryText;
    Flickr.searchForPhotos(this.queryText, this.handleLoadedImages.bind(this));
  }

  Gallery.prototype.handleLoadedImages = function(data) {
    var photos = data['photos']['photo'];
    // extned the current this.photos array with the new queried photos array
    this.photos.push.apply(this.photos, photos);
    this.grid.loadPhotos(photos);
    this.lighthouse.loadPhotos(photos);
  }

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


  window.Gallery = Gallery;


})(window, document);
