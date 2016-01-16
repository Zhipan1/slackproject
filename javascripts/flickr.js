(function(document, window) {
  'use strict';

  var APIKEY = 'a66c5f4f4c67a538260f199913198b2f';
  var APIURL = 'https://api.flickr.com/services/rest/';
  var httpRequest;

  function buildFlickrUrl(method, params) {
    var requestParams = Utility.extend(params, {
      method: method,
      api_key: APIKEY,
      format: 'json',
      nojsoncallback: 1
    });

    return Utility.buildUrl(APIURL, requestParams);
  }

  function handleAjaxCallback(success, failure) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      // it's okay if no success or faiure function provided
      if (httpRequest.status === 200 && success) {
        success(JSON.parse(httpRequest.response));
      } else if (failure) {
        failure(JSON.parse(httpRequest.response));
      }
    }
  }

  function ajaxCall(method, url, successCallback, failCallback) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('lmao sorry');
      return false;
    }

    httpRequest.onreadystatechange = function () {handleAjaxCallback(successCallback, failCallback)};
    httpRequest.open(method, url);
    httpRequest.send();
  }

  function searchForPhotos(text, successCallback, failureCallback) {
    var requestUrl = buildFlickrUrl('flickr.photos.search', {
      text: text,
      safe_search: 1,
      per_page: 48,
      sort: "interestingness-desc"
    });
    ajaxCall('GET', requestUrl, successCallback, failureCallback);
  }


  function buildPhotoUrl(photo, size) {
    if (size == 'thumbnail') {
      size = '_q';
    } else if (size == "large") {
      size = '_b';
    } else {
      size = ''
    }
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + size + '.jpg';
   }


  window.Flickr = {
    searchForPhotos: searchForPhotos,
    buildPhotoUrl: buildPhotoUrl
  }



})(document, window);
