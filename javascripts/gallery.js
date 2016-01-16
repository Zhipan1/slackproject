(function(window, document) {

  'use strict';

  function Gallery(gridContainers, lighthouseContainers, loadMoreButton) {
    this.lighthouse = new LightHouse(lighthouseContainers, this.hideLighthouseImage.bind(this));
    this.grid = new Grid(gridContainers, this.showLighthouseImage.bind(this));
    this.loadMoreButton = loadMoreButton;
    this.page = 0;
    this.photos = [];
    this.queryText = '';

    //attach events
    this.loadMoreButton.addEventListener('click', function() {this.loadImages(this.queryText)}.bind(this))
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
    this.reset();
    this.queryText = queryText;
    this.loadImages(this.queryText);
  }

  Gallery.prototype.reset = function() {
    this.grid.reset();
    this.lighthouse.reset();
    this.queryText = '';
    this.page = 0;
  }

  Gallery.prototype.loadImages = function(queryText) {
    this.queryText = queryText;
    this.page++;
    Flickr.searchForPhotos(this.queryText, this.handleLoadedImages.bind(this), this.handleLoadFail.bind(this), {page: this.page});
  }

  Gallery.prototype.handleLoadFail = function(data) {
    console.log("uh oh...", data);
  }

  Gallery.prototype.handleLoadedImages = function(data) {
    var photos = data['photos']['photo'];
    // extned the current this.photos array with the new queried photos array
    this.photos.push.apply(this.photos, photos);
    this.grid.loadPhotos(photos);
    this.lighthouse.loadPhotos(photos);
  }

  window.Gallery = Gallery;


})(window, document);
