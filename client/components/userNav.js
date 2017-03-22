angular.module('etapartments')
.directive('userNav', function() {
	return {
    scope: {},
    controllerAs: 'userNav',
    bindToController: true,
    controller: 'userNavCtrl',
		templateUrl: 'client/htmlTemplates/userNav.html',
	}
})
.controller('userNavCtrl', function(auth) {
	this.logIn= function() {
		var user = {
			username: this.username,
			password: this.password
		};
		auth.logIn(user);
	};
	this.signUp = function() {
		var user = {
			username: this.username,
			password: this.password
		};
		auth.signUp(user);
	};
})