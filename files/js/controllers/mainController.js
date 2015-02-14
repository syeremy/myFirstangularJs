/**
 * Created by yeremy on 2/12/2015.
 */
// Code goes here

//Revealing Module Pattern
(function(){
    //Use the module
    var app = angular.module("gitHubViewer");

    var MainController = function($scope, $interval, $log, $location) {

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
            if(countDownInterval){
                $interval.cancel(countDownInterval);
                $scope.countdown = 0;
            }

            //Change the client fragment to #/user/someuser
            $location.path("/user/" + username);
        };


        $scope.username = "angular";
        $scope.countdown = 15;
        startCountDown();
    };

    //app.controller("MainController", MainController);
    app.controller("MainController", ["$scope", "$interval","$log", "$location",  MainController]);
})();