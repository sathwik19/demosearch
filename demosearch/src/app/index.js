'use strict';

 var searchModule = angular.module('mainApp', []);

 searchModule.controller('searchController', ['$scope','$http', function ($scope,$http) {
     var resourceURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=';
     var apiKey = '&key=AIzaSyDfY9fzZrhqVeyzTlzb47w56p2k0Qy2aB0';
     $scope.searchResult = [];
     $scope.$watch('searchQuery', function (newvalue, oldValue) {

         if (newvalue) {
             var url = resourceURL + newvalue + apiKey;

             $http.get(url).then(function (data) {
                 if (data && data.data) {
                     $scope.searchResult = data.data.items;
                 }
             }, function (data) {
                 //error callback
                 $scope.searchResult = [];
             });
         }
         else {
             $scope.searchResult = [];
         }
     });

 }]);
