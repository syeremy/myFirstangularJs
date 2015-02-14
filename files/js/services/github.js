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
            return $http.get(repos_url)
                .then(function(response){
                    return response.data;
                });
        };

        var getContributors = function(username, reponame){
            var url = "https://api.github.com/repos/" + username + "/"  + reponame + "/contributors";
            return genericHttpGet(url);
        };

        var genericHttpGet = function(url)
        {
            $log.info("http get to : " + url);
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        };

        return {
            getUser : getUser,
            getRepositories : getRepos,
            getContributors : getContributors
        };
    };

    var module = angular.module("gitHubViewer");
    module.factory("github", github);
})();