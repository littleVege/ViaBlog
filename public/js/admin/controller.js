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
    .controller('TabsController',function($scope) {
        $scope.path = "";
    })
    .controller("EditPostController",['$scope',"$sce",'$routeParams','$http',
        function($scope,$sce,$routeParams,$http) {
            var pid = $routeParams.pid;

            if (pid) {
                $http.get('/api/p/'+pid,function(data) {
                    $scope.mdContent = data.markdown;
                    $scope.title = data.title;
                });
            }

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
        }
    ]);