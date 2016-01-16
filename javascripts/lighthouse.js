(function(window, document) {
  'use strict';

  function LightHouse(containers, onCloseCallback) {
    this.mainContainer = containers['main_container'];
    this.imageTextContainer = containers['image_text_container'];
    var imageContainers = containers['image_containers'];
    this.prevImageContainer = imageContainers[0];
    this.currentImageContainer = imageContainers[1];
    this.nextImageContainer = imageContainers[2];
    this.nextImageButton = containers['next_image_button'];
    this.prevImageButton = containers['prev_image_button'];
    this.closeImageButton = containers['close_image_button'];
    this.overlay = containers['overlay'];
    this.photosData = [];
    this.displayPhotos = [];
    this.prevImage = null;
    this.currentImage = null;
    this.nextImage = null;
    this.photoIndex = 0;

    //hide prev and next images
    this.prevImageContainer.setAttribute('style', "display: none" );
    this.nextImageContainer.setAttribute('style', "display: none" );

    //attach event handler
    this.nextImageButton.addEventListener("click", this.showNextPhoto.bind(this));
    this.prevImageButton.addEventListener("click", this.showPrevPhoto.bind(this));
    this.closeImageButton.addEventListener("click", onCloseCallback);
  }

  LightHouse.prototype.loadPhotos = function(photos) {
    // append new photos to the end of the list
    var startingIndex = this.photosData.length;
    for (var photoIndex = startingIndex, array_index = 0; array_index < photos.length; array_index++, photoIndex++) {
      this.loadPhoto(photos[array_index], photoIndex);
    }
  }

  LightHouse.prototype.loadPhoto = function(photo, index) {
    this.displayPhotos.push(new LightHousePhoto(photo, index));
  }

  LightHouse.prototype.showPhotoAtIndex = function(index) {
    this.photoIndex = index;
    this.showPhotoAtCurrentIndex();
  }

  LightHouse.prototype.showOverlay = function() {
    if (this.overlay.className.indexOf("active") == -1) {
      this.overlay.setAttribute('style', "display: block" );
      setTimeout(function() {this.overlay.className += ' active'}.bind(this), 30);
    }
  }

  LightHouse.prototype.hideOverlay = function() {
    this.overlay.className = this.overlay.className.replace(' active','');
    setTimeout(function() {this.overlay.setAttribute('style', "display: none" );}.bind(this), 300);
  }

  LightHouse.prototype.show = function() {
    if (this.mainContainer.className.indexOf("active") == -1) {
      this.mainContainer.setAttribute('style', "display: block" );
      setTimeout(function() {this.mainContainer.className += ' active'}.bind(this), 30);
      this.showOverlay();
    }
  }

  LightHouse.prototype.showPhotoAtCurrentIndex = function() {
    //load current image first, then load surrounding
    setTimeout(this.show.bind(this), 200);
    this.currentImage = this.displayPhotos[this.photoIndex];
    this.prevImage = this.photoIndex > 0 ? this.displayPhotos[this.photoIndex - 1] : null;
    this.nextImage = this.photoIndex < this.displayPhotos.length - 1 ? this.displayPhotos[this.photoIndex + 1] : null;
    this.currentImage.loadPhoto(this.currentImageContainer, this.onCurrentImageLoad.bind(this));
    this.setLighthouseText(this.currentImage.getTitle());
  }

  LightHouse.prototype.setLighthouseText = function(text) {
    this.imageTextContainer.innerHTML = text;
  }

  LightHouse.prototype.onCurrentImageLoad = function() {
    this.currentImage.show();
    this.loadSurroundImage();
  }

  LightHouse.prototype.loadSurroundImage = function() {
    if (this.nextImage)
      this.nextImage.loadPhoto(this.nextImageContainer);
    if (this.prevImage)
      this.prevImage.loadPhoto(this.prevImageContainer);
  }

  LightHouse.prototype.showPrevPhoto = function() {
    if (this.photoIndex > 0) {
      // reset next image so that it rerenders
      if (this.nextImage) this.nextImage.clear();
      if (this.currentImage) this.currentImage.hide();

      this.photoIndex--;
      var tempPrevContainer = this.prevImageContainer;
      var tempCurrentContainer = this.currentImageContainer;
      this.prevImageContainer = this.nextImageContainer;
      this.currentImageContainer = tempPrevContainer;
      this.nextImageContainer = tempCurrentContainer;
      this.showPhotoAtCurrentIndex();
    }
  }

  LightHouse.prototype.showNextPhoto = function() {
    if (this.photoIndex < this.displayPhotos.length - 1) {
      // reset prev image so that it rerenders
      if (this.prevImage) this.prevImage.clear();
      if (this.currentImage) this.currentImage.hide();

      this.photoIndex++;
      var tempPrevContainer = this.prevImageContainer;
      var tempCurrentContainer = this.currentImageContainer;
      this.prevImageContainer = tempCurrentContainer
      this.currentImageContainer = this.nextImageContainer;
      this.nextImageContainer = tempPrevContainer;
      this.showPhotoAtCurrentIndex();
    }
  }

  LightHouse.prototype.hide = function() {
    this.mainContainer.className = this.mainContainer.className.replace(" active", "");
    setTimeout(function() {this.mainContainer.setAttribute('style', "display: none" );}.bind(this), 300)
  }

  LightHouse.prototype.close = function() {
    // clear out all rendered imgs
    if (this.currentImage)
      this.currentImage.hide();
    if (this.prevImage)
      this.prevImage.hide();
    if (this.nextImage)
      this.nextImage.hide();
    this.hideOverlay();
    this.hide();
  }

  LightHouse.prototype.reset = function() {
    this.photosData = [];
    this.displayPhotos = [];
    this.prevImage = null;
    this.currentImage = null;
    this.nextImage = null;
    this.photoIndex = 0;
  }






  function LightHousePhoto(photo, index) {
    this.photo = photo;
    this.index = index;
    this.rendered = false;
  }

  LightHousePhoto.prototype.loadPhoto = function(container, onload) {
    if (!this.rendered) {
      container.src = Flickr.buildPhotoUrl(this.photo, 'large');
      this.rendered = true;
      this.DOMElement = container;
      if (onload) {
        this.DOMElement.onload = onload;
      }
    }
    else if (onload) {
      // since loaded already run onload callback
      onload();
    }
  }

  LightHousePhoto.prototype.clear = function() {
    this.rendered = false;
  }

  LightHousePhoto.prototype.show = function() {
    if (this.rendered)
      this.DOMElement.setAttribute('style', "display: block" );
  }

  LightHousePhoto.prototype.hide = function() {
    this.DOMElement.setAttribute('style', "display: none" );
    this.clear();
  }

  LightHousePhoto.prototype.getTitle = function() {
    return this.photo.title;
  }

  window.LightHouse = LightHouse;

})(window, document);
