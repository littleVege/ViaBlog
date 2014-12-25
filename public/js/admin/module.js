/**
 * Created by little_vege on 2014/12/20.
 */
var AdminModule = angular.module('admin',['ui.codemirror','ngSanitize','ngRoute']);
AdminModule.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
    $routeProvider
        .when('/list', {
            templateUrl: 'templates/admin/tab_post_list.html',
            controller: 'PostListController'
        })
        .when('/edit/:pid', {
            templateUrl: 'templates/admin/tab_edit_post.html',
            controller: 'EditPostController'
        })
        .when('/create',{
            templateUrl: 'templates/admin/tab_edit_post.html',
            controller: 'EditPostController'
        })
        .otherwise({
            redirectTo: '/list'
        });
}]);