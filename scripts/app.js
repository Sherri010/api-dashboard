angular
  .module("promisingApp", ["flakyHttp"])
  .constant("flakyHttpSettings", {
    // randomized $http failure rate (and delay)
    // so you can test your success/error callbacks
    FAIL_RATE: 50, // 0-100 percent
    min_delay_ms: 0,
    max_delay_ms: 900
  })
  .controller("ApiDashboardController", ApiDashboardController)


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
  vm.showSpinner = false;
  vm.getEndpoint = getEndpoint;

  function getEndpoint(url){
    vm.display_data=null;
    vm.showSpinner =true;
    $http.get(url).then(onSuccess,onError);
    // request the api endpoint
    // display the raw response data in the view
  }


  function onSuccess(response){
    vm.showSpinner=false;
    console.log(response);
    vm.display_data = response.data;
  }
  function onError(err){
    vm.showSpinner=false;
    console.log(err);
  }
}




console.log('app.js fully loaded!');
