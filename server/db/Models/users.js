var database = require('../index.js')
var utils = require('../../utils/usersCrypto.js')

var db = database.db

//find a user given an inputted username
var findUser = function (username) {
	var queryString = 'SELECT * FROM users WHERE username=$1';
	return db.query(queryString, [username])
	.then(function(users) {
		console.log(users, 'users')
		return users;
	})
	.catch(function(error){
		console.log('error!')
		throw error;
	})
}

var createUser = function (user) {

	// create a salt
	var userSalt = utils.createSalt();
	
	// create a hashed password
	var hashedPassword = utils.createHashedPassword(user.password, userSalt);

	var newUser = {
		username: user.username,
		hash: hashedPassword,
		salt: userSalt
	};
	// console.log(newUser, 'newUser')

	return db.query('INSERT INTO $1~ (username, hash, salt) VALUES ($2, $3, $4)', ['users', newUser.username, newUser.hash, newUser.salt])
	.then(function(data) {
		console.log(data, 'data!')
		return data;
	}).catch(function(error) {
		console.log(error, 'error')
	});
}




var loginAuth = function(username, password) {
	// db query with username, return username, password, salt
	return db.query('SELECT * FROM users where username=$1', username).then(function(results) {
		var stored = results[0]
		if(utils.compareHash(password, stored.hash, stored.salt)) {
			console.log('SUCCESS!')
			return true;
		} else {
			console.log('FAILURE!')
			return false;
		}
	})
}



module.exports = {
	findUser: findUser,
	createUser: createUser,
	loginAuth: loginAuth,
};
