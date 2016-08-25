angular.module('bowyerville')
	.directive("siteFooter", function() {
		return {
			templateUrl: '../views/footer/footer.html'
		};
	})
	.directive("siteHeader", function() {
		return {
			templateUrl: '../views/header/header.html'
		}
	});