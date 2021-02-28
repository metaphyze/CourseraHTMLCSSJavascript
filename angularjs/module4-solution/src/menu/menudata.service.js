(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService);


    MenuDataService.$inject = ['$q','$http']
    function MenuDataService($q,$http) {
        var service = this;
        
        service.getAllCategories = function() {
            console.log("MenuDataService","executing getAllCategories");
            
            var serverCall = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/categories.json"
            }).then(function success(response) {
                // [
                //     {
                //         "id": 81,
                //         "short_name": "L",
                //         "name": "Lunch",
                //         "special_instructions": "Sunday-Friday 11:15am-3:00pm. Served with your choice of rice (Vegetable Fried RIce, Steamed Rice, Brown Rice), AND EITHER soup (Hot \u0026 Sour, Wonton, Vegetable, Egg Drop, Chicken Corn Soup) OR veggie egg roll. $1.00 extra to have both soup and egg roll.",
                //         "url": "https://davids-restaurant.herokuapp.com/categories/81.json"
                //     }
                //         ...
                // ]
                var items = response.data;
                return items;
            });

            return serverCall;
        };

        service.getItemsForCategory = function(categoryShortName) {
            console.log("getItemsForCategory","ITEM:" + categoryShortName)
            var serverCall = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName
            }).then(function success(response) {
                // {
                //     "menu_items":[
                //     {
                //         "id":877,
                //         "short_name":"A1",
                //         "name":"Won Ton Soup with Chicken",
                //         "description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
                //         "price_small":2.55,
                //         "price_large":5.0,
                //         "small_portion_name":"pint",
                //         "large_portion_name":"quart"
                //     },
                //     ...
                // ],
                //     "category":{
                //     "short_name":"A",
                //         "name":"Soup",
                //         "special_instructions":""
                //     }
                // }
                
                
                // I'm returning the WHOLE object, not just the menu_items
                // so that I can get the category name to display on the page
                // along with the items
                return response.data;
            });

            return serverCall;
        }
    }

})();
