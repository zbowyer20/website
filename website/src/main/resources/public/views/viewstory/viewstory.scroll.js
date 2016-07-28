(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.directive('scrolly', function() {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
					var raw = element[0];
					scope.content.selected.scrollPositions = {
						start: 0
					};
					element.bind("scroll", function() {
						scope.content.selected.scrollPositions = {
							start: scope.content.selected.scrollPositions.start == null ? 0 : scope.content.selected.scrollPositions.start,
							end: scope.content.selected.scrollPositions.end == null ? raw.scrollHeight : scope.content.selected.scrollPositions.end
						}
						var currentPosition = raw.scrollTop + raw.offsetHeight;
						if (scope.content.selected.type != 'video') {
							if (currentPosition < scope.content.selected.scrollPositions.start) {
								scope.$apply(attrs.last);
							}
							else if (currentPosition >= scope.content.selected.scrollPositions.end) {
								var nextStartPosition = scope.content.selected.scrollPositions.end;
								scope.$apply(attrs.scrolly);
								if (scope.content.selected.scrollPositions.start == null) {
									scope.content.selected.scrollPositions = {
											start: nextStartPosition,
											end: raw.scrollEnd
									}
								}
							}
							else if ((currentPosition - scope.content.selected.scrollPositions.start) >= ((scope.content.selected.scrollPositions.end - scope.content.selected.scrollPositions.start) / 2)) {
								scope.$apply(attrs.preload);
							}
						}
					});
				}
			}
		});
})();