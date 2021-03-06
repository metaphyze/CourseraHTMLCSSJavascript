(function () {

    angular.module('restaurant')
        .service("IdService",IdService) 
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['IdService']
    
    function SignUpController(IdService) {
        var ctrl = this;
        var id = IdService.getId()
        ctrl.firstname = id.firstname;
        ctrl.lastname = id.lastname;
        ctrl.emailAddr = id.emailAddr;
        ctrl.phoneNumber = id.phoneNumber;
        ctrl.favoriteMenuItem = id.favoriteMenuItem;

        ctrl.signUp = function () {
            console.log("submitting");
            IdService.setId(
                {
                    firstname : ctrl.firstname,
                    lastname : ctrl.lastname,
                    emailAddr : ctrl.emailAddr,
                    phoneNumber : ctrl.phoneNumber,
                    favoriteMenuItem : ctrl.favoriteMenuItem
                });
        };
    };
    
    function IdService() {
         var idService = this;
         idService.id = {
             firstname : "",
             lastname : "",
             emailAddr : "",
             phoneNumber : "",
             favoriteMenuItem : ""
         };
         
         idService.setId = function(newId) {
             idService.id = newId;   
         };
         
         idService.getId = function () {
             return idService.id;
         };
         
        
    };

})();