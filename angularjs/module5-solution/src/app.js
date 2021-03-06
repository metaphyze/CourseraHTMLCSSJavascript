(function () {

    angular.module('restaurant')
        .service("IdService",IdService) 
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['IdService','$http','ApiPath']
    
    function SignUpController(IdService,$http,ApiPath) {
        var ctrl = this;
        var NON_SUBMITTED = 0;
        var SUBMITTING = 1;
        var SUBMISSION_SUCCESS = 2;
        var SUBMISSION_FAILURE = 3;
        
        
        ctrl.resetItemValidity = function() {
          ctrl.itemIsInvalid = false; 
          ctrl.submissionState = NON_SUBMITTED;
        };

        ctrl.signUp = function () {
            ctrl.itemIsInvalid = false;
            ctrl.submissionState = SUBMITTING; 
            
            $http.get(ApiPath + "/menu_items/" + ctrl.favoriteMenuItem.toUpperCase() + ".json").then(function (response)
                {
                    console.log("DATA:",response.data);
                    ctrl.submissionState = SUBMISSION_SUCCESS;
                    
                    IdService.setId(
                        {
                            firstname : ctrl.firstname,
                            lastname : ctrl.lastname,
                            emailAddr : ctrl.emailAddr,
                            phoneNumber : ctrl.phoneNumber,
                            favItem: response.data
                        });    
                }).catch(function(errorResponse)
                {
                    console.log("ERROR:",errorResponse);
                    ctrl.itemIsInvalid = true;
                    ctrl.submissionState = SUBMISSION_FAILURE;
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
             favItem: {}
         };
         
         idService.setId = function(newId) {
             idService.id = newId;   
         };
         
         idService.getId = function () {
             return idService.id;
         };
         
        
    };

})();