// Creates the market Ctrl Module and Controller. Note that it depends on 'geolocation' and 'gservice' modules.
var marketCtrl = angular.module('marketCtrl', ['geolocation', 'gservice']);
marketCtrl.controller('marketCtrl', function($scope, $log, $http, $rootScope, geolocation, gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var marketBody = {};

    // Functions
    // ----------------------------------------------------------------------------

    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        // Set the latitude and longitude equal to the HTML5 coordinates
        $scope.formData.longitude = parseFloat(coords.long).toFixed(11);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(11);
    });

    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(11);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(11);
        });
    });
});