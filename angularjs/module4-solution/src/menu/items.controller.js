(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);


    ItemsController.$inject = ['categoryItems'];
    function ItemsController(categoryItems) {
        console.log("ITEMS in controller",categoryItems);
        var itemsList = this;
        itemsList.categoryItems = categoryItems;
    }

})();
