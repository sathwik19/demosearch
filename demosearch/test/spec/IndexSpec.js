describe("Index test", function() {
    beforeEach(angular.mock.module('mainApp'));

    var $controller,scope,httpBackend;
    var resourceURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=';
    var apiKey = '&key=AIzaSyDfY9fzZrhqVeyzTlzb47w56p2k0Qy2aB0';

    beforeEach(angular.mock.inject(['$rootScope', '$controller','$injector', function($rootScope, controller, $injector){
        $controller = controller;
        scope = $rootScope.$new();
        httpBackend = $injector.get('$httpBackend');
    }]));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

  it("should load index", function() {
      var controller = $controller('searchController', { $scope: scope });
   
      expect(controller).toBeDefined();

  });
  
  it("should call youtube search and fail", function() {

      var controller = $controller('searchController', { $scope: scope });
      scope.searchQuery = 'sailing';
      scope.searchResult = [{},{}]; // setting empty objects with length 2
      var requestHandler = httpBackend.when('GET', resourceURL + scope.searchQuery + apiKey).respond(500,'');

      scope.$root.$digest();
      httpBackend.flush();

      expect(scope.searchResult.length).toBe(0);
  });

    it("should call youtube search and get response", function() {

        var controller = $controller('searchController', { $scope: scope });
        scope.searchQuery = 'sailing';
        scope.searchResult = [{},{}]; // setting empty objects with length 2
        var requestHandler = httpBackend.when('GET', resourceURL + scope.searchQuery + apiKey).respond({
            "kind": "youtube#searchListResponse",
            "etag": "\"DsOZ7qVJA4mxdTxZeNzis6uE6ck/mySC6xKlL7S3F13IG9e1_ZohXhc\"",
            "nextPageToken": "CBkQAA",
            "regionCode": "IN",
            "pageInfo": {
                "totalResults": 1000000,
                "resultsPerPage": 25
            },
            "items": [
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"DsOZ7qVJA4mxdTxZeNzis6uE6ck/z1Or8jd3rb2qXK9ZNdIiJPH6O4Q\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "FOt3oQ_k008"
                    },
                    "snippet": {
                        "publishedAt": "2014-03-01T01:01:13.000Z",
                        "channelId": "UCWEtnEiVwUy7mwFeshyAWLA",
                        "title": "Rod Stewart - \"Sailing\" (Official Music Video)",
                        "description": "Watch the official music video for Rod Stewart - \"Sailing\" - - - - Get Rod Stewart music: iTunes - http://bit.ly/1fuLJFp - - - - http://www.rodstewart.com/ ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/FOt3oQ_k008/default.jpg",
                                "width": 120,
                                "height": 90
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/FOt3oQ_k008/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/FOt3oQ_k008/hqdefault.jpg",
                                "width": 480,
                                "height": 360
                            }
                        },
                        "channelTitle": "RhinoEntertainment",
                        "liveBroadcastContent": "none"
                    }
                }
            ]
        });

        scope.$root.$digest();
        httpBackend.flush();

        expect(scope.searchResult.length).toBe(1);
    });

});
