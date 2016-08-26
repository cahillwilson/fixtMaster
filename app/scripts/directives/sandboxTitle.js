angular.module('fixtApp')
	.directive("contenteditable", function(){
		return{
			restrict:"A",
			require:"ngModel",
			link:function(scope, element, attrs,ngModel){
                
				function read(){
                    //write data to the model
					ngModel.$setViewValue(element.html());
				}
                
                // Specify how UI should be updated
				ngModel.$render = function(){
					element.html(ngModel.$viewValue || "");
				};

				element.bind("blur keyup change", function(){
					scope.$apply(read);
				});
			}
		}

	});