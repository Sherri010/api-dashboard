// DO NOT MODIFY

/*
 * This module simulates randomized $http failures
 *   and causes brief delays of up to 900ms.
 *
 * For a 50% chance that $http requests will fail,
 *   in app.js set `FAIL_RATE = 50`.
 */

function flakyHttp ($httpProvider){
  $httpProvider.interceptors.push(function($q) {
    return {
      // 'request': function(config) {
      //   return config;
      //  },

      'response': function(response) {
         var deferred = $q.defer();
         (new DelayMaker()).delay().then(
            function(){
              deferred.resolve(response);
            },
            function(){
              deferred.reject();
            }
         )
         return deferred.promise;
      }
    };
  });
};


function DelayMaker (max, min, fail_rate, verbose){
  this.min = min || 0; // ms
  this.max = max || 900; // ms
  this.fail_rate = fail_rate || window.FAIL_RATE || 0; // percent
  this.verbose = verbose || true;
  this.countdown_interval = 100;
}

DelayMaker.prototype.delay = function(){
  var wait_ms = Math.round( Math.max(this.min, (Math.random() * this.max)) );
  var countdown = wait_ms;
  var interval = this.countdown_interval;
  var counter = (wait_ms >= interval*2) && setInterval(function(){
    countdown -= interval;
    console.log("countdown:", Math.ceil(countdown/interval));
  }, interval)

  var succeed = (Math.random() * 100) >= this.fail_rate;

  var promise = jQuery.Deferred();

  setTimeout(function(){
    counter && clearInterval(counter);

    if (succeed) {
      promise.resolve();
    } else {
      promise.reject();
    }

    console.log( promise.state() + "!" ); // TODO: callback may not be back

  }, wait_ms)

  return promise;
}
