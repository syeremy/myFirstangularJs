/**
 * Created by yeremy on 2/13/2015.
 * Custom Service
 */

(function(){

    var github = function($http, $log){

        var getUser = function(username){
            return $http.get("https://api.github.com/users/" + username)
                .then(function(response){
                    return response.data;
                });
        };

        var getRepos = function(repos_url){
            $log.info(repos_url);
            return $http.get(repos_url)
                .then(function(response){
                    $log.info(response.data);
                    return response.data;
                });
        };

        return {
            getUser : getUser,
            getRepos : getRepos
        };
    };

    var module = angular.module("gitHubViewer");
    module.factory("github", github);
})();