/**
 * Created by yeremy on 2/12/2015.
 */
// Code goes here

//Revealing Module Pattern
(function(){
    //Use the module
    var app = angular.module("gitHubViewer");

    var MainController = function($scope, github, $interval, $log, $anchorScroll, $location) {
        var onUserComplete = function(data) {
            $scope.user = data;

            $log.info("getting repos from : " + $scope.user.repos_url);
            var promise = github.getRepos($scope.user.repos_url);
            $log.info("promise : " + promise);
            promise.then(onRepo, onError);
        };


        var onRepo = function(data) {
            $log.info("onRepo");
            $scope.repos = data;
            $location.hash("userDetails");
            $anchorScroll();
        };

        var onError = function(reason) {
            $scope.error = "could not fetch the user";
        };

        var decrementCountdown = function(){
            $scope.countdown -=1;
            if($scope.countdown < 1){
                $scope.search($scope.username);
            }
        };

        var countDownInterval = null;
        var startCountDown = function(){
            countDownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search = function(username){
            $log.info("searching for " + username);
            var promise = github.getUser(username);
            $log.info("gerUser Promise : " + promise);
            promise.then(onUserComplete, onError);

            if(countDownInterval){
                $interval.cancel(countDownInterval);
                $scope.countdown = 0;
            }
        };


        $scope.username = "angular";
        $scope.message = "hello there!";
        $scope.repoSortOrder = "-stargazers_count";
        $scope.countdown = 5;
        startCountDown();
    };

    //app.controller("MainController", MainController);
    app.controller("MainController", ["$scope", "github", "$interval","$log", "$anchorScroll", "$location",  MainController]);
})();