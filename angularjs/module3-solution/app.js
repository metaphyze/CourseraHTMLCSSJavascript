(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems',FoundItemsDirective)
    
    function FoundItemsDirective() {
        var ddo = {
            restrict: 'E',  // restrict directive to be an element
            scope: {
                removeItem: '&onRemove', 
                items: '<foundItems' 
            },
            controller: FoundItemsDirectiveController,
            bindToController: true,
            controllerAs: 'directiveCtrl',
            templateUrl: 'menuListTemplate.html'
        };
        
        return ddo;
    }
    
    function FoundItemsDirectiveController() {
        var directiveCtrl = this;
        directiveCtrl.formatPrice = function (item) {
            if (item.price_small > 0 && item.price_large > 0) {
                return "Price: $" + item.price_small + " (small), $" + item.price_large+" (large)"
            } else if (item.price_small > 0) {
                return "Price: $" + item.price_small
            } else if(item.price_large > 0) {
                return "Price: $" + item.price_large
            } else {
                return "Price Not Listed"
            }
        }
        
        directiveCtrl.showNoResultsMessage = function() {
            if (directiveCtrl.items === undefined) {
                // No search has been performed yet.
                return false
            }
            
            return directiveCtrl.items != null && directiveCtrl.items.length == 0;
        }
    }
    
    MenuSearchService.$inject = ['$http']
    
    function MenuSearchService($http) {
        var service = this;
        
        service.getMatchedMenuItems = function(searchTerm) {
            var serverCall = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function success(response) {
                var items = response.data;
                var filteredItems = [];

                if (items.menu_items != null && items.menu_items.length > 0) {

                    // Example object
                    // {
                    //   "id": 877,
                    //   "short_name": "A1",
                    //   "name": "Won Ton Soup with Chicken",
                    //   "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
                    //   "price_small": 2.55,
                    //   "price_large": 5,
                    //   "small_portion_name": "pint",
                    //   "large_portion_name": "quart"
                    // }

                    for (var inx = 0; inx < items.menu_items.length; inx++) {
                        var lowerCaseDescription = items.menu_items[inx].description.toLowerCase();
                        if (lowerCaseDescription.indexOf(searchTerm) != -1) {
                            filteredItems.push(items.menu_items[inx]);
                        }
                    }
                }
                
                return filteredItems;
            });
            
            return serverCall;
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;
        controller.searchTerm = "";
        controller.found = undefined; // Undefined until a search has been performed
        
        controller.removeMenuItem = function(index) {
            if (index >= 0 && index < controller.found.length ) {
                controller.found.splice(index,1) 
            } 
        };
        
        controller.filterItems = function() {
            var term = controller.searchTerm.trim().toLowerCase();
            if (term == "") {
                controller.found = [];
                return;
            }
            var asyncServerCall = MenuSearchService.getMatchedMenuItems(term);
            
            asyncServerCall.then(function success(filteredItems) {
               controller.found = filteredItems;
            }).catch(function error(response) {
                console.log("ERROR:",response.data);
                controller.found = [];
            });
        };
    }
})();