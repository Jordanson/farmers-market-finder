// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['addCtrl', 'queryCtrl', 'headerCtrl', 'geolocation', 'gservice', 'ngRoute'])

    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider){

        // Join Team Control Panel
        $routeProvider.when('/join', {
            controller: 'addCtrl',
            templateUrl: 'partials/addForm.html',

        // Find Teammates Control Panel
        }).when('/find', {
            controller: 'queryCtrl',
            templateUrl: 'partials/queryForm.html',

        // Market Profile Control Panel
        }).when('/market', {
            controller: 'marketCtrl',
            templateUrl: 'partials/marketForm.html',

        // Guest Error Page Control Panel
        }).when('/error', {
            controller: 'errorCtrl',
            templateUrl: 'partials/Form.html',

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
