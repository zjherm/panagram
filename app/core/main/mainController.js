(function () {
    'use strict';
    angular.module('app')

      .controller('MainController', mainController);

      mainController.$inject = ['$http'];

    function mainController($http) {
          var vm = this;
          
          vm.phrase = '';
          vm.results = [];

          vm.getPhrases = function(){
          	console.log('inside getPhrases');
          	$http.get("/query?q=" + vm.phrase)
          	    .then(function(response) {
          	        vm.results = response.data.results;
          	    });
          };
    	}
    })();
