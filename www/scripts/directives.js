'use strict';

angular.module('hoodieApp').
directive('welcome', ['hoodie', function(hoodie){
	return {
		restrict: 'AC',
		link: function($scope, iElm) {
			hoodie.account.on('signup', function(username){
				iElm.text('Hello '+ username);
			});
			hoodie.account.on('authenticated', function(username){
				iElm.text('Hello '+ username);
			});

			hoodie.account.on('signout', function(){
				iElm.text('');
			});

			iElm.text('');
		}
	};
}]);