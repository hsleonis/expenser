/*
 ROUTER v1.0.1
 Expenser. v1.0.0
 (c) 2016 THEMEAXE, http://themeaxe.com
 License: ISC
 Author: MD. Hasan Shahriar
 Author email: hsleonis2@gmail.com
 */

app.config(function($routeProvider,$locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'templates/home.html',
            controller  : 'homeController'
        });
    $locationProvider.html5Mode(true);
});
