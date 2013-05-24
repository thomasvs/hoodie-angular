'use strict';

angular.module('hoodieApp', ['hoodie-angular'])
  //App Configuration
  //
  .config(function ($routeProvider, hoodieProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    hoodieProvider.setUrl('http://hoodie_appname.dev');

  }).
  //App Values injections
  //
  value('localStorage', localStorage).
  //App Main Controller
  //
  controller('MainCtrl', ['$scope', 'hoodie', 'localStorage', function ($scope, hoodie) {
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
