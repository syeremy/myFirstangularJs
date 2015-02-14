/**
 * Created by yeremy on 2/14/2015.
 */
(function(){

    var app = angular.module("gitHubViewer");

    var RepositoryController = function($scope, github, $routeParams) {

        var onContributors = function(data) {
            $scope.contributors = data;
        };

        var onRepoDetails = function(data) {
            $scope.repo = data;
        };

        var onError = function(reason) {
            $scope.error = "could not fetch the contributors";
        };

        $scope.reponame = $routeParams.reponame;
        $scope.username = $routeParams.username;
        github.getContributors($routeParams.username, $routeParams.reponame).then(onContributors, onError);

        //Solution 2
        github.getRepoDetails($routeParams.username, $routeParams.reponame).then(onRepoDetails, onError);
    };

    app.controller("RepositoryController", RepositoryController);
})();