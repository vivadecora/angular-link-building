(function(){
	"use strict";

	angular.module('link-builder').directive('angularLinkBuilding', AngularLinkBuildingDirective);

	function AngularLinkBuildingDirective($compile, $AngularLinkBuilding){
		var directive = {
			restrict: "AE",
			scope: {},
			replace: true,
			transclude: true,    
			template: '<ng-transclude></ng-transclude>',
			link: function(scope, element, attr, ctrl, transclude){
				transclude(scope, function(content) {
				var htmlContentOriginal = content[1].innerHTML;
				var htmlContentReplaced = htmlContentOriginal;

				for(var i=0; i < LinkBuilder.configuration.rules.length; i++){
					var keywords = LinkBuilder.configuration.rules[i].keywords;
					var href = LinkBuilder.configuration.rules[i].href;
					var replaceRegex = new RegExp("("+keywords.join("|")+")", "gi");
					var replaceLink = '<a href="'+href+'" title="$1">$1</a>';
					htmlContentReplaced = htmlContentReplaced.replace(replaceRegex, replaceLink);  
				}

				var htmlToReplace = $compile(htmlContentReplaced)(scope);    
				element.replaceWith(htmlToReplace);
				});
			}
		};
		return directive;
	}

})();