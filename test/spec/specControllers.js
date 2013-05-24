'use strict';

describe('Controllers', function () {

  var hoodie, controllerFN, scope, ctrl;

  // load the controller's module
  beforeEach(module('hoodieApp'));

  beforeEach(inject(['$controller', '$rootScope', 'hoodie', function($controller, $rootScope, hoodieDep){
    scope = $rootScope.$new();
    hoodie = hoodieDep;
    controllerFN = $controller;
  }]));

  describe('MainCtrl', function(){

    beforeEach(function(){
      spyOn(hoodie, 'unbind');
      spyOn(hoodie.store, 'on');
      spyOn(hoodie.store, 'findAll').andCallThrough();
      ctrl = controllerFN('MainCtrl', { $scope : scope, hoodie: hoodie });
    });

    it('should unbind store.add:todo', function () {
      expect(hoodie.unbind).toHaveBeenCalled();
    });

    it('should bind add and clear', function () {
      expect(hoodie.store.on).toHaveBeenCalledWith('add:todo', jasmine.any(Function));
      expect(hoodie.store.on).toHaveBeenCalledWith('clear', jasmine.any(Function));
    });

    it('should findAll todos', function () {
      expect(hoodie.store.findAll).toHaveBeenCalled();
    });
  })

  describe('LoginCtrl', function(){

    var dialog = {
      close: function(){}
    }

    beforeEach(function(){
      spyOn(hoodie.account, 'on').andCallThrough();
      ctrl = controllerFN('LoginCtrl', { $scope : scope, hoodie: hoodie, dialog : dialog });
    });

    it('should listen to authenticate event', function(){
      expect(hoodie.account.on).toHaveBeenCalledWith('authenticated', scope.close);
    });

    it('should signup', function(){
      spyOn(hoodie.account, 'signUp');
      scope.signUp('test', 'passwordTest', 'passwordTest');
      expect(hoodie.account.signUp).toHaveBeenCalledWith('test', 'passwordTest', 'passwordTest');
    });

    it('should signin', function(){
      spyOn(hoodie.account, 'signIn');
      scope.signIn('test', 'passwordTest');
      expect(hoodie.account.signIn).toHaveBeenCalledWith('test', 'passwordTest');
    });

    it('should close when login success', function(){

      spyOn(dialog, 'close');

      spyOn(hoodie.account, 'signIn').andCallFake(function(){
        hoodie.account.trigger('authenticated');
      });

      scope.signIn('test', 'passwordTest');

      expect(dialog.close).toHaveBeenCalled();

    });

  });
});

