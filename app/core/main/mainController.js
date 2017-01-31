(function () {
	'use strict';
	angular.module('app')

		.controller('MainController', mainController);

	mainController.$inject = ['$http'];

	function mainController($http) {
		var vm = this;

		vm.phrase = '';
		vm.results = [];
		vm.letter = '';

		vm.getRandomWord = function() {
			$http.get("/random_word")
				.then(function (response) {
					vm.phrase = response.data.word;
					vm.getPhrases();
				});
		}

		vm.isPrime = function(number) {
			var start = 2;
			while (start <= Math.sqrt(number)) {
				if (number % start++ < 1) return false;
			}
			return number > 1;
		}

		vm.getPhrases = function () {
			console.log('inside getPhrases');
			$http.get("/query?q=" + vm.phrase + "&filter=" + vm.letter)
				.then(function (response) {
					var time = response.config.responseTimestamp - response.config.requestTimestamp;
					vm.responseTime = time/1000;
					vm.results = response.data.results;
					vm.numResults = vm.results.length;
				});
		};
		vm.isPalindrome = function(word) {
		  if(word.length <= 1) return true;
		  for(var i=0;i<word.length/2;i++) {
		    if(word[i] !== word[word.length-1-i]) {
		      return false;
		    }
		  }
		  return true;
		};


		vm.getRandomWord();
	}
})();
