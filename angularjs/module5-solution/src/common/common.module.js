(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://coursera-angularjs-module5.herokuapp.com/')
.directive('disallowSpaces', function() {
        return {
            restrict: 'A',

            link: function($scope, $element) {
                $element.bind('input', function() {
                    $(this).val($(this).val().replace(/ /g, ''));
                });
            }
        };
})
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
