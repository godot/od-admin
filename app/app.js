'use strict';

angular.module('do', [
    'ngRoute',
    'do.objects',
    'do.records',
    'ngGrid'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/objects'});
    }]);
