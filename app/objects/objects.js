'use strict';

angular.module('ondat.objects', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/objects', {
            templateUrl: 'objects/objects.html'
        });
    }])

    .factory('DcObjectCollection', function() {
        var data = {
            role: { name: 'role', fields: [{name: 'name', type: 'text'}] },
            user: { name: 'user',
                    fields: [
                        {name: 'login', type: 'text'},
                        {name: 'fullname', type: 'text'},
                        {name: 'no', type: 'number'},
                        {name: 'role', type: 'hasOne', collection: 'role'}
                    ]
                  },
            company: {
                name: 'company',
                fields: [
                    {name: 'name', type: 'text'},
                    {name: 'street', type: 'text'}
                ]
            }
        };

        return {
            all: function() { return data; },
            save: function(object) {
                var _object = angular.copy(object);
                data[_object.name] = _object;
                console.log(data,_object);
            }
        };
    })

    .directive('dcObjectForm', function(){
        return {
            restrict: 'E',
            templateUrl: 'object-form.html',
            scope: { ngModel: '='},
            controller: 'ObjectFormController'
        };
    })

    .directive('dcObjectCollection', function(){
        return {
            restrict: 'A',
            scope: true,
            controller: 'ObjectsController'
        };
    })

    .factory('DcObject', function(){
        return function() {
            this.fields = [
                {type:'text'}
            ];
        };
    })

    .controller('ObjectsController', ['$scope','DcObjectCollection', function($scope,db) {
        $scope.objects = db.all();

        $scope.select = function(selected) {
            $scope.record = angular.copy(selected);
        };
    }])

    .controller('ObjectFormController', ['$scope','DcObjectCollection','DcObject', function($scope,db,DcObject) {
        $scope.ngModel = new DcObject();
        $scope.objects = db.all();
        $scope.fields = {
            text: {
                name: 'text',
                type: 'text'
            },
            textarea: {
                name: 'long text',
                type: 'textarea'
            },
            number: {
                name: 'number',
                type: 'number'
            },
            date: {
                name: 'date',
                type: 'date'
            },
            yesNo: {
                name: 'yes/no',
                type: 'select',
                values: ['yes', 'no']
            },
            hasOne: {
                name: 'has one',
                type: 'relation'
            }
        };

        $scope.addField = function(){
            $scope.ngModel.fields.push({ type: 'text'});
        };

        $scope.save = function(record) {
            if (!record || !record.name) return;
            db.save( record );
            $scope.ngModel = new DcObject();
        };

    }]);

;
