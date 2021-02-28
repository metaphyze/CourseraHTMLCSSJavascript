(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);


    ItemsController.$inject = ['categoryItems'];
    function ItemsController(items) {
        console.log("ITEMS in controller",items);
        var itemsList = this;
        itemsList.categoryItems = items;
    }

})();
