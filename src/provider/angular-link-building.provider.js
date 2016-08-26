(function(){
	"use strict";

	angular.module('angular-link-building').provider('$AngularLinkBuilding', AngularLinkBuilding);


	function AngularLinkBuilding(){
		var configuration = {
			rules: [],
			addRule: addRule,
			addAllRules: addAllRules,
		};

		function addRule(rule){
			configuration.rules.push(rule);
		}

		function addAllRules(rules){
			for(var i=0; i < rules.length; i++){
				var rule = rules[i];
				configuration.rules.push(rule);
			}
		}

		var provider = {
			$get: LinkBuilderModel,
			configuration: configuration
		}
		return provider;

		function LinkBuilderModel(){
			var model = {
				configuration: configuration
			};
			return model;
		} 
	}


})();