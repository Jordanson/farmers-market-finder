angular.module('gservice', [])
    .factory('gservice', function($rootScope, $http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        // Array of locations obtained from API calls
        var locations = [];

        // Market Selected Location (initialize to Ponce City Market)
        var selectedLat = 33.772;
        var selectedLong = -84.366;
    
        // Handling Clicks and location selection
        googleMapService.clickLat  = 0;
        googleMapService.clickLong = 0;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Takes three parameters (lat, long, and filtering results)
    googleMapService.refresh = function(latitude, longitude, filteredResults){

    // Clears the holding array of locations
    locations = [];

    // Set the selected lat and long equal to the ones provided on the refresh() call
    selectedLat = latitude;
    selectedLong = longitude;

    // If filtered results are provided in the refresh() call...
    if (filteredResults){

        // Then convert the filtered results into map points.
        locations = convertToMapPoints(filteredResults);

        // Then, initialize the map -- noting that a filter was used (to mark icons yellow)
        initialize(latitude, longitude, true);
    }

    // If no filter is provided in the refresh() call...
    else {

        // Perform an AJAX call to get all of the records in the db.
        $http.get('/markets').success(function(response){

            // Then convert the results into map points
            locations = convertToMapPoints(response);

            // Then initialize the map -- noting that no filter was used.
            initialize(latitude, longitude, false);
        }).error(function(){});
    }
};
        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of markets into map points
        var convertToMapPoints = function(response){

            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var market = response[i];

                // Create popup windows for each record
<<<<<<< HEAD
                var contentString =
                    '<p><b>Name</b>: ' + user.username +
                    '<br><b>Address</b>: ' + user.favlang +
                    '<br><button type="submit" class="btn btn-danger btn-xs" ng-click="removePin()">Delete</button><br>'
                    '</p>'
=======
                var  contentString =
                    '<p><b>Name</b>: ' + market.marketname +
                    '<br><b>Address</b>: ' + market.address +
                    '<br><button type="submit" class="btn btn-primary btn-xs">Edit</button><button type="submit" class="btn btn-danger btn-xs">Delete</button><br>'
                    '</p>';
>>>>>>> 314e46b65caecb6aa612d2e5d194cb74a3fad797

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(market.location[1], market.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    marketname: market.marketname,
                    address: market.address
            });
        }
        // location is now an array populated with records in Google Maps format
        return locations;
    };

// Initializes the map
var initialize = function(latitude, longitude, filter) {

    // Uses the selected lat, long as starting point
    var myLatLng = {lat: selectedLat, lng: selectedLong};

    // If map has not been created...
    if (!map){

        // Create a new map and place in the index.html page
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: myLatLng
        });
    }

    // If a filter was used set the icons yellow, otherwise blue
    if(filter){
        icon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    }
    else{
        icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    }

    // Loop through each location in the array and place a marker
    locations.forEach(function(n, i){
        var marker = new google.maps.Marker({
            position: n.latlon,
            map: map,
            title: "Big Map",
            icon: icon,
        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });

    // Set initial location as a bouncing red marker
    var initialLocation = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: initialLocation,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    lastMarker = marker;

    // Function for moving to a selected location
    map.panTo(new google.maps.LatLng(latitude, longitude));

    // Clicking on the Map moves the bouncing red marker
    google.maps.event.addListener(map, 'click', function(e){
        var marker = new google.maps.Marker({
            position: e.latLng,
            animation: google.maps.Animation.BOUNCE,
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });

        // When a new spot is selected, delete the old red bouncing marker
        if(lastMarker){
            lastMarker.setMap(null);
        }

        // Create a new red bouncing marker and move to it
        lastMarker = marker;
        map.panTo(marker.position);

        // Update Broadcasted Variable (lets the panels know to change their lat, long values)
        googleMapService.clickLat = marker.getPosition().lat();
        googleMapService.clickLong = marker.getPosition().lng();
        $rootScope.$broadcast("clicked");
    });
};

// Refresh the page upon window load. Use the initial latitude and longitude
google.maps.event.addDomListener(window, 'load',
    googleMapService.refresh(selectedLat, selectedLong));

return googleMapService;
});
