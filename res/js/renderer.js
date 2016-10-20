// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
(function (angular) {

    var modules = [
        'lokijs'
    ];
    var db = null;
    var expense = null;

    var app = angular.module('expenser', modules).run(function ($templateCache, $http) {
        $http.get('index.html', {
            cache: $templateCache
        });
    });

    // Main Controller
    app.controller('mainController', ['$scope', 'Loki', function ($scope, Loki) {
        db = new Loki('./app.db',{
            autosave: true,
            autosaveInterval: 500,
            autoload: true
        });
        console.log(db.listCollections());

        expense = db.getCollection('expense');
        if(expense === null) {
            expense = db.addCollection('expense', {
                indices: ['date', 'purpose', 'amount']
            });
            console.log(expense);
        }

    }]);
    
    // Input Controller
    app.controller('inputController', ['$scope', 'Loki', function ($scope, Loki) {
        $scope.addExpense = function () {
            var data = {
                'date': $scope.input_date,
                'purpose': $scope.input_purpose,
                'amount': $scope.input_amount
            };
            expense.insert(data);
            db.saveDatabase();
            console.log(expense); // output
        };
    }]);

    // Output Controller
    app.controller('outputController', ['$scope', 'Loki', function ($scope, Loki) {
        $scope.expenses = expense.data;
    }])

})(window.angular);
