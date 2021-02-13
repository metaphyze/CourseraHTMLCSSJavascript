(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    function ShoppingListCheckOffService() {
        var service = this;
        service.itemsToBuy = [
            {
                name : "cookies",
                quantity: 10
            },
            {
                name : "candy bars",
                quantity: 5
            },
            {
                name : "applies",
                quantity: 100
            },
            {
                name : "oranges",
                quantity: 30
            },
            {
                name : "bananas",
                quantity: 50
            }
            ];
            
        service.itemsBought = [];
        
        service.buyItem = function(index) {
            var itemBought = service.itemsToBuy[index];
            service.itemsToBuy.splice(index,1)
            service.itemsBought.push(itemBought);
        };
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buyList = this;
        buyList.itemsToBuy = ShoppingListCheckOffService.itemsToBuy;
        buyList.buyItem = function(index) {
            ShoppingListCheckOffService.buyItem(index)
        }
    }


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;
        boughtList.itemsBought = ShoppingListCheckOffService.itemsBought;


    }

})();