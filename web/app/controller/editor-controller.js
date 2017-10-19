/**
 * @author halab.
 */
'use strict';

teaBlogCore.controller('EditorController', ['$scope', '$localStorage', 'flash','PublicType','TagService', 'PostService', 'StringUtils',
	function ($scope, $localStorage, flash, PublicType, TagService, PostService,StringUtils) {

		$scope.publicTypes = PublicType.VALUES;

		$scope.post = {
			publicType: 1,
			tags: []
		};
		$scope.tags = [];
		$scope.input = {
			publicDate: new Date()
		};

		let listAllTag = function () {
			TagService.listTag({skip: 0, take: 0}).$promise.then(function (response) {
				$scope.tags = response.data.tags;
				$scope.suggestedTags = angular.copy($scope.tags);
			});
		};

		listAllTag();

		$scope.datePicker = {
			opened: false
		};

		$scope.openDatePicker = function () {
			$scope.datePicker.opened = true;
		};
		$scope.datePickerOptions = {
			maxDate: new Date(),    //today
			startingDay: 1          //monday
		};

		$scope.save = function () {
			$scope.post.content = simpleMDE.value();
			$scope.post.publicDate = moment($scope.input.publicDate).utc().format('YYYYMMDDHHmmss');
			console.log($scope.post);
			if(validate()) {
				PostService.createPost($scope.post).$promise.then(function (response) {
					flash.success = "Save post successfully"
				});
			}
		};

		let validate = function() {
			if (StringUtils.isBlank($scope.post.title)) {
				flash.error = "Title can not be blank";
				return false;
			}
			if (StringUtils.isBlank($scope.post.content)) {
				flash.error = "Content can not be blank";
				return false;
			}
			return true;
		};

		$scope.openModal = function() {
			$scope.postClone = angular.copy($scope.post);
			$scope.inputClone = angular.copy($scope.input);
		};

		$scope.cancel = function () {
			$scope.post = angular.copy($scope.postClone);
			$scope.input = angular.copy($scope.inputClone);
		};

		const KEY_ENTER = 13;
		$scope.enterNewTag = function (event) {
			let code = event.keyCode;
			if (code === KEY_ENTER) {
				let tagName = $scope.input.tag;
				addPostTag(tagName);
			}
		};

		let addPostTag = function (tagName) {
			$scope.input.tag = '';
			if (tagName === '' || isExistedTag(tagName, $scope.post.tags)) {
				return;
			}
			removeFromSuggestedTags(tagName);
			$scope.post.tags.push({name: tagName});
		};

		let isExistedTag = function (tagName, tagList) {
			for (let i = 0; i < tagList.length; i++) {
				let tag = tagList[i];
				if (tag.name === tagName) {
					return true;
				}
			}
			return false;
		};

		let removeFromSuggestedTags = function (tagName) {
			for (let i = 0; i < $scope.suggestedTags.length; i++) {
				let tag = $scope.suggestedTags[i];
				if (tag.name === tagName) {
					$scope.suggestedTags.splice(i, 1);
				}
			}
		};

		$scope.removeTag = function (index) {
			let tag = $scope.post.tags[index];
			$scope.post.tags.splice(index, 1);
			if (isExistedTag(tag.name, $scope.tags)) {
				$scope.suggestedTags.push(tag);
			}
		};
	}]);