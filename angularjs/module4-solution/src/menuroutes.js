(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/menu/templates/home.template.html'
            })

            .state('categoriesList', {
                url: '/categories-list',
                templateUrl: 'src/menu/templates/categories.template.html',
                controller: 'CategoriesController as categoriesList',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })

           .state('categoriesList.items', {
                url: '/items/{categoryId}',
                templateUrl: 'src/menu/templates/category-itemslist.template.html',
                controller: "ItemsController as itemsList",
                resolve: {
                    categoryItems: ['MenuDataService','$stateParams', function (MenuDataService,$stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryId);
                    }]
                }
        });
    }

})();
