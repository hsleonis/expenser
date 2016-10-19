// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
(function (angular) {

    var modules = [
        'lokijs'
    ];

    var app = angular.module('expenser', modules).run(function ($templateCache, $http) {
        $http.get('index.html', {
            cache: $templateCache
        });
    });
    
    // Input Controller
    app.controller('inputController', ['$scope', 'Loki', function ($scope, Loki) {
        var db = new Loki('./app.db');
        var expense = db.addCollection('expense', {
            indices: ['date','purpose','amount']
        });

        $scope.addExpense = function () {
            var data = {
                'date': $scope.input_date,
                'purpose': $scope.input_purpose,
                'amount': $scope.input_amount
            };
            expense.insert(data);
            console.log(expense);
        };
    }])

})(window.angular);
