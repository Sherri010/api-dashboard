// randomized $http failure rate (and delay)
// so you can test your success/error callbacks
FAIL_RATE = 0;

angular
  .module("promisingApp", [])
  .controller("ApiDashboardController", ApiDashboardController)
  .config(flakyHttp);


ApiDashboardController.$inject = ["$http"];
function ApiDashboardController($http) {
  var vm = this;

  vm.popular_endpoints = [
    "https://api.spotify.com/v1/search?q=never+gonna+give+you+up&type=track",
    "https://www.reddit.com/r/Rick_Astley/.json",
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=4ef070a1a5e8d5fd19faf868213c8bd0&nojsoncallback=1&text=rick+astley"
  ];

  vm.api_endpoint = ""; // user inputed url
  vm.display_data = null; // JSON response data

  vm.getEndpoint = getEndpoint;

  ////

  function getEndpoint(){
    // request the api endpoint
    // display the raw response data in the view
  }
}


////

console.log('app.js fully loaded!');
