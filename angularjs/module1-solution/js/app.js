(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.items = "";
        $scope.resultOfCheck = "";
        $scope.customStyle = {};

        $scope.checkItems = function () {
            if ($scope.items.length == 0) {
                $scope.resultOfCheck = "Please enter data first";
                $scope.customStyle.colorClass = "red";
                return;
            }
            
            var items = $scope.items.split(',');
            
            var count = items.length;
            
            for( const item of items ) {
                if (item.trim().length == 0) {
                    count--;
                }
            }
            
            if (count == 0) {
                // ALL the items entered were empty: ,,,,,,,,,,,
                $scope.resultOfCheck = "Please enter data first";
                $scope.customStyle.colorClass = "red";
            } else if (count > 3) {
                $scope.resultOfCheck = "Too much!";
                $scope.customStyle.colorClass = "red";
            } else {
                $scope.resultOfCheck = "Enjoy!";
                $scope.customStyle.colorClass = "green";
            }
            
        };

    }

})();
