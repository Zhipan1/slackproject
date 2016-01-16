(function(window, document) {
  'use strict';

  function Grid(container, photoOnClick) {
    this.gridPhotos = [];
    this.container = container;
    this.photoOnClick = photoOnClick;
  }

  Grid.prototype.reset = function() {
    this.gridPhotos = [];
    this.container.innerHTML = "";
  }

  Grid.prototype.loadPhotos = function(photos) {
    // append new photos to the end of the list
    var startingIndex = this.gridPhotos.length;
    for (var photoIndex = startingIndex, array_index = 0; array_index < photos.length; array_index++, photoIndex++) {
      this.loadPhoto(photos[array_index], photoIndex);
    }
  }

  Grid.prototype.loadPhoto = function(photo, index) {
    var photo = new GridPhoto(photo, index, this.photoOnClick);
    this.gridPhotos.push(photo);
    var PhotoDOMElement = photo.createDomElement();
    this.appendPhoto(PhotoDOMElement);
  }

  Grid.prototype.appendPhoto = function(PhotoDOMElement) {
    this.container.appendChild(PhotoDOMElement);
  }

  Grid.prototype.showPhotos = function() {
    for (var i = 0; i < this.gridPhotos.length; i++) {
      this.gridPhotos[i].show();
    }
  }

  function GridPhoto(photo, index, onClick) {
    this.photo = photo;
    this.index = index;
    this.DOMElement;
    this.onClick = clickHandler(this);

    function clickHandler(photoInstance) {
      return function(e) {
        // make event and index available to function
        onClick(e, photoInstance.index);
      };
    };
  }

  GridPhoto.prototype.createDomElement = function() {
    var img_container = document.createElement("DIV");
    var img = document.createElement("IMG");
    img.src = Flickr.buildPhotoUrl(this.photo, '');
    img_container.appendChild(img);
    img_container.addEventListener("click", this.onClick);
    img_container.className = "grid-photo";
    img.onload = this.show.bind(this);
    this.DOMElement = img_container;
    return this.DOMElement;
  }

  GridPhoto.prototype.show = function(e) {
    this.DOMElement.setAttribute('style', "display: inline-block" );
    setTimeout(function() {
      this.DOMElement.className += " active";
    }.bind(this), 50);
  }

  window.Grid = Grid;


})(window, document);
