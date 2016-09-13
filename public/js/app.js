var app = angular.module('meanMapApp', ['addCtrl', 'queryCtrl', 'geolocation', 'gservice', 'ngRoute'])

    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider){

        // Add Market Control Panel
            $routeProvider.when('/join', {
            controller: 'addCtrl', 
            templateUrl: 'partials/addForm.html',

        // Find Markets Control Panel
        }).when('/find', {
            controller: 'queryCtrl',
            templateUrl: 'partials/queryForm.html',

        // Market Profile Control Panel
        }).when('/market', {
            controller: 'marketCtrl',
            templateUrl: 'partials/marketForm.html',

        // User Error Page Control Panel
        }).when('/uerror', {
            controller: 'uerrorCtrl',
            templateUrl: 'partials/uerrorForm.html',

        // Market Created Control Panel
        }).when('/created', {
            controller: 'createdCtrl',
            templateUrl: 'partials/createdForm.html',

            // All else forward to the Join Team Control Panel
        }).otherwise({redirectTo:'/find'})
    });