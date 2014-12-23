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
    .controller('TabsController',['$scope',function($scope) {
        $scope.activeTab = null;
        $scope.tabs=[];
    }])
    .controller("CreatePostController",['$scope',"$sce",function($scope,$sce) {
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