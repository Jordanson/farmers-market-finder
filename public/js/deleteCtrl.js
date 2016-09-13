var deleteCtrl = angular.module('deleteCtrl', ['geolocation', 'gservice']);
deleteCtrl.controller('deleteCtrl', function($scope, $http, $rootScope, geolocation, gservice){ 

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // User Selected Location (initialize to Ponce City Market)
    var selectedLat = 33.772;
    var selectedLong = -84.366;
    
    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){

    // Set the latitude and longitude equal to the HTML5 coordinates
    coords = {lat:data.coords.latitude, long:data.coords.longitude};

    // Display coordinates in location textboxes rounded to three decimal points
    $scope.formData.longitude = parseFloat(coords.long).toFixed(11);
    $scope.formData.latitude = parseFloat(coords.lat).toFixed(11);

    gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

});

    // Functions
    // ----------------------------------------------------------------------------
    
    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

    // Run the gservice functions associated with identifying coordinates
    $scope.$apply(function(){
        $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(11);
        $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(11);
    });
});
    
    // Creates a new market based on the form fields
    $scope.deleteMarket = function() {

        // Removes the market data to the db
        $http.remove('/markets', marketData)
            .success(function (data) {
                
            // Refresh the map with new data
            gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});