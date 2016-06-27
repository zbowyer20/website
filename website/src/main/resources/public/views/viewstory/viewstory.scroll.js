(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.directive('scrolly', function() {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
					var raw = element[0];
					scope.selected.scrollPositions = {
						start: 0
					};
					element.bind("scroll", function() {
						scope.selected.scrollPositions = {
							start: scope.selected.scrollPositions.start == null ? 0 : scope.selected.scrollPositions.start,
							end: scope.selected.scrollPositions.end == null ? raw.scrollHeight : scope.selected.scrollPositions.end
						}
						var currentPosition = raw.scrollTop + raw.offsetHeight;
						if (currentPosition < scope.selected.scrollPositions.start) {
							scope.$apply(attrs.last);
						}
						else if (currentPosition >= scope.selected.scrollPositions.end) {
							var nextStartPosition = scope.selected.scrollPositions.end;
							scope.$apply(attrs.scrolly);
							if (scope.selected.scrollPositions.start == null) {
								scope.selected.scrollPositions = {
									start: nextStartPosition,
									end: raw.scrollEnd
								}
							}
						}
					});
				}
			}
		});
})();