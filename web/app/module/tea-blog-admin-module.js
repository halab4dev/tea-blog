/**
 * @author halab.
 */
'use strict';

var teaBlogAdmin = angular.module('teaBlogAdmin', ['teaBlogCore','ui.router', 'ui.bootstrap']);

teaBlogAdmin.config(function($stateProvider) {

	var statistic = {
		name: 'statistic',
		url: '/statistic',
		template: '<h3>hello world!</h3>'
	};

	var editor = {
		name: 'editor',
		url: '/editor',
		controller: 'EditorController',
		templateUrl: '../view/editor.html'
	};

	$stateProvider.state(statistic);
	$stateProvider.state(editor);
});