/**
 * Created by yeremy on 2/14/2015.
 */
//Immediately-Invoked Function Expression (IIFE)
(function(){
    //Create the module
    var app = angular.module("gitHubViewer", ["ngRoute"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/main", {
                templateUrl : "views/main.html",
                controller : "MainController"
            })
            .otherwise({redirectTo:"/main"});
    });
})();