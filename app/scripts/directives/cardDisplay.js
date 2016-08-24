angular.module('fixtApp')
	.directive('cardInfo', function(){

	return{
		restrict:'EA',
		replace: true,
			scope:{
				nodeId: "="
			},
		//transclued:true;
		templateUrl: "../views/card_info.html",
		controller: function($scope, $location){
			var id = $location.search().id;
			$scope.sandboxId = id;
		}	
	}
});	
