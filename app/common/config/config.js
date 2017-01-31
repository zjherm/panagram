(function () {
	'use strict';

	var app = angular.module('app');

	app.factory('logTimeTaken', [function() {
		var logTimeTaken = {
			request: function(config) {
				config.requestTimestamp = new Date().getTime();
				return config;
			},
			response: function(response) {
				response.config.responseTimestamp = new Date().getTime();
				return response;
			}
		};
		return logTimeTaken;
	}]);

	app.config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('logTimeTaken');
	}]);
})();
