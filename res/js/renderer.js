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
    
    // Parse date
    app.filter('UTFDate',function(){
        return function(input) {
            return input.substring(0, 10).split('-').reverse().join('-');
        };
    });

    // Order the Object by
    app.filter('orderDate', function() {
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return ( parseInt(a[field].substring(0, 2)) > parseInt(b[field].substring(0, 2)) ? 1 : -1);
            });
            if(reverse) filtered.reverse();
            return filtered;
        };
    });

    // Main Controller
    app.controller('mainController', ['$scope', 'Loki', function ($scope, Loki) {
        db = new Loki('app.json',{
            autosave: true,
            autosaveInterval: 500
        });
    }]);
    
    // Input Controller
    app.controller('inputController', ['$scope', 'Loki', function ($scope, Loki) {
        $scope.addExpense = function () {
            var data = {
                'date': $scope.input_date.toLocaleDateString(),
                'purpose': $scope.input_purpose,
                'amount': $scope.input_amount
            };
            expense.insert(data);
            db.saveDatabase();
            $scope.input_date = $scope.input_amount = $scope.input_purpose = null;
        };
    }]);

    // Output Controller
    app.controller('outputController', ['$scope', 'Loki', function ($scope, Loki) {
        db.loadDatabase({}, function () {
            expense = db.getCollection('expense');

            if(expense === null) {
                expense = db.addCollection('expense', {
                    indices: ['date', 'purpose', 'amount']
                });
            }
            $scope.$apply(function () {
                $scope.expenses = expense.data;
            });
        });

        $scope.remExpense = function (item) {
            $scope.total-=item.amount;
            expense.remove({
                $loki: item.$loki
            });
        };
    }])

})(window.angular);
