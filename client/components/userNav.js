angular.module('etapartments')
.directive('userNav', function() {
	return {
	    scope: {
	    	loginuser: '<'
	    },
	    controllerAs: 'userNav',
	    bindToController: true,
	    controller: 'userNavCtrl',
		templateUrl: 'client/htmlTemplates/userNav.html',
	}
})
.controller('userNavCtrl', function(auth) {
	this.displayLoginMessage = false;
	this.displaySignupMessage = false;
	this.setLoginState = function(err, user) {
		if (err) {
			this.displayLoginMessage = true;
			this.displaySignupMessage = false
		} else if (user) {
			this.displayLoginMessage = false;
			this.displaySignupMessage = false
		}
	}.bind(this);

	this.setSignupState = function(err, user) {
		if (err) {
			this.displaySignupMessage = true;
			this.displayLoginMessage = false;
		} else if (user) {
			this.displaySignupMessage = false;
			this.displayLoginMessage = false;
		}
	}.bind(this);

	this.logIn = function() {
		var user = {
			username: this.username,
			password: this.password
		};
		this.loginuser(user, this.setLoginState);
	};
	this.logOut = function() {
		auth.logOut();
	};
	this.signUp = function() {
		var user = {
			username: this.username,
			password: this.password
		};
		auth.signUp(user, this.setSignupState);
	};
})