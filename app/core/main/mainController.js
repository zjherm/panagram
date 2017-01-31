(function () {
	'use strict';
	angular.module('app')

		.controller('MainController', mainController);

	mainController.$inject = ['$http'];

	function mainController($http) {
		var vm = this;

		vm.phrase = '';
		vm.results = [];

		vm.getPhrases = function () {
			console.log('inside getPhrases');
			$http.get("/query?q=" + vm.phrase)
				.then(function (response) {
					var time = response.config.responseTimestamp - response.config.requestTimestamp;
					vm.responseTime = time/1000;
					vm.results = response.data.results;
				});
		};
	}
})();
