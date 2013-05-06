'use strict';

angular.module('hoodieApp')
	.controller('AppCtrl',['$scope', '$dialog', function($scope, $dialog){
		$scope.login = function(){

			$dialog.dialog({
				backdrop: true,
				keyboard: true,
				dialogFade: true,
				backdropFade: true,
				dialogClass: 'modal login',
				backdropClick: true,
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'
			}).open();

		}
	}])

	.controller('LoginCtrl',['$scope', 'hoodie', 'dialog', function($scope, hoodie, dialog){

		$scope.alerts = [];
		$scope.close = function(){
			dialog.close();
		}

		$scope.signIn = function(email, password){
			hoodie.account.signIn(email, password);
		}

		$scope.signUp = function(email, password, passwordConfirmation){
			hoodie.account.signUp(email, password, passwordConfirmation);
		}

		hoodie.account.on('authenticated', $scope.close);
		hoodie.account.on('signup', $scope.close);
		hoodie.on('account:error:unauthenticated remote:error:unauthenticated', function(){
			$scope.$apply(function(){
				$scope.alerts.push({msg: 'Authentication Failed!'});
			});
		});

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

	}])


	.controller('MainCtrl', ['$scope', 'hoodie', 'localStorage', function ($scope, hoodie) {
		$scope.todo = { title: ''};
		$scope.mail = { text: ''};
		$scope.todos = [];

		$scope.clearTodos = function(){
			$scope.todos = [];
		};

		$scope.addTodo = function(todo){
			$scope.todos.push(todo);
		};

		$scope.setTodos = function(todos){
			$scope.clearTodos();
			todos.sort( function(a, b) {
				return a.createdAt > b.createdAt;
			}).forEach( $scope.addTodo );
		};

		$scope.createTodo = function(){
			hoodie.store.add('todo', $scope.todo);
		};

		hoodie.unbind('store:add:todo');

		hoodie.store.on('add:todo', $scope.addTodo);
		hoodie.store.on('clear', $scope.clearTodos);
		hoodie.store.findAll('todo').then($scope.setTodos);

	}]);
