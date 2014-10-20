'use strict';

angular.module('ondat', [
    'ngRoute',
    'ondat.objects',
    'ondat.records',
    'ngGrid'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/objects'});
    }]);
