/**
 * Created by yeremy on 2/12/2015.
 */
// Code goes here

//Revealing Module Pattern
(function(){
    //Use the module
    var app = angular.module("gitHubViewer");

    var UserController = function($scope, github, $log, $routeParams) {
        var onUserComplete = function(data) {
            $scope.user = data;
            $log.info("getting repos from : " + $scope.user.repos_url);
            var promise = github.getRepos($scope.user.repos_url);
            promise.then(onRepo, onError);
        };


        var onRepo = function(data) {
            $scope.repos = data;
        };

        var onError = function(reason) {
            $scope.error = "could not fetch the user";
        };



        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";

        github.getUser($scope.username).then(onUserComplete, onError)
    };

    app.controller("UserController", UserController);
    //app.controller("MainController", ["$scope", "github", "$interval","$log", "$anchorScroll", "$location",  MainController]);
})();