AdminModule
    .controller('PostListController',['$scope','$http',function($scope,$http) {
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
    }])
    .controller('TabsController',function($rootScope,$scope) {
        $scope.path = "";
        $rootScope.$on('$routeChangeSuccess',function(val) {
            alert(val);
        });
    })
    .controller("EditPostController",['$scope',"$sce",function($scope,$sce) {
        // The ui-codemirror option
        $scope.cmOption = {
            lineNumbers: false,
            indentWithTabs: true,
            theme:'monokai',
            mode:"markdown"
        };
        $scope.mdContent="";
        $scope.title = "";

        $scope.$watch('mdContent',function(val) {
            $scope.htmlContent = marked(val);
        });

        $scope.asHtml = function(html) {
            return $sce.trustAsHtml(html);
        };

        $scope.htmlContent = "";
    }]);