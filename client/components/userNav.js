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
	this.displayMessage = false;
	this.setState = function(err, user) {
		if (err) {
			this.displayMessage = true;
		} else if (user) {
			this.displayMessage = false;
		}
	}.bind(this);
	this.logIn= function() {
		var user = {
			username: this.username,
			password: this.password
		};
		auth.logIn(user, this.setState);
	};
	this.signUp = function() {
		var user = {
			username: this.username,
			password: this.password
		};
		auth.signUp(user, this.setState);
	};
})