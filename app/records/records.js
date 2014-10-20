'use strict';

angular.module('ondat.records', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/records', {
            templateUrl: 'records/records.html'
        });
    }])

    .factory('DcDatabase', function() {
        var data = {};
        return {
            all: function() { return data; },
            save: function(collection, object) {
                var _object = angular.copy(object);
                data[collection] = data[collection] || [];
                data[collection].push(_object);
            }
        };

    })

    .directive('dcInput', ['$compile','$http','$templateCache','DcDatabase', function($compile,$http,$templateCache,db){
        return {
            restrict: 'E',
            scope: {ngModel: '=', field: '=', type: '='},
            link: function(scope , element, attrs) {
                scope.$watch('field.collection', function(collection) {
                    if (collection){
                        scope.values = db.all()[collection];
                    };
                });

                scope.$watch(attrs.type, function (type) {
                    if (type) {
                        loadTemplate('/fields/dc-'+type+'.html');
                    }
                });

                //don't touch - it's magic ;)
                function loadTemplate(template) {
                    $http.get(template, { cache: $templateCache })
                        .success(function(templateContent) {
                            element.replaceWith($compile(templateContent)(scope));
                        });
                }
            }
        };
    }])

    .controller('RecordController', ['$scope','DcDatabase', function($scope,db) {
        $scope.database = db;

        $scope.save = function(collection, record){
            db.save(collection,record);
            $scope.add();
            $scope.visible = false;
        };
        $scope.add = function(){
            $scope.visible = true;
        };
        $scope.entry = {};
    }])

    .directive('dcRecordCollection', function(){
        return {
            restrict: 'A',
            scope: true,
            controller: 'RecordsController'
        };
    })

    .controller('RecordsController', ['$scope','DcObjectCollection', function($scope,db) {
        $scope.objects = db.all();
    }]);
