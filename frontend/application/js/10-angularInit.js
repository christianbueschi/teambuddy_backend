
var teambuddy = window.angular.module('teambuddy', []);

teambuddy.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});