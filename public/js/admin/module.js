/**
 * Created by little_vege on 2014/12/20.
 */
var AdminModule = angular.module('admin',['ngRoute','adminControllers']);
AdminModule.config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');

        $routeProvider.when('/',{
            templateUrl:''
        })
    }
]).run(['$rootScope','$location',
    function($rootScope, $location) {

        $rootScope.path = $location.path();
        $rootScope.$on('$routeChangeSuccess', function(newVal) {
            $rootScope.path = $location.path();
        });

    }
]);