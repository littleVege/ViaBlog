AdminModule.controller('PostListController',['$scope','$http',function($scope,$http) {
    $scope.posts = [
        {title:'name',abstract:'title~~~~~~~~~~',pid:1}
    ];
    $scope.currentPost = null;
    $scope.getContent = function(post) {
        $scope.currentPost = post;
        $http.get('/p/'+post.pid).success(function(data) {
            $scope.currentPost.content = data;
        });
    }
}]);
AdminModule.controller('TabsController',['$scope',function($scope) {
    $scope.activeTab = null;
    $scope.tabs=[];
}]);