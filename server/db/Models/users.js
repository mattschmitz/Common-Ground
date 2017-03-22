var database = require('../index.js')
var utils = require('../../utils/usersCrypto.js')

var db = database.db

//find a user given an inputted username
var findUser = function (username) {
	var queryString = 'SELECT  * FROM users WHERE username=$1';
	return db.query(queryString, [username])
	.then(function(users) {
		console.log(users)
		return users[0];
	})
	.catch(function(error){
		throw error;
	})
}

//create a new user given a user object that contains:
// 1. user-chosen username
// 2. giraffe-generated hash value
// 3. giraffe-generated salt value

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

module.exports = {
	findUser: findUser,
	createUser: createUser
};

var user = {
	username: 'justinjyoo',
	password: '123'
}
console.log(findUser(user.username), 'no !')
console.log(!findUser(user.username), '!')
console.log(!!findUser(user.username), '!!')

findUser(user.username).catch(function() {
	createUser(user)
}).then(function() {
	console.log('user has already been created...')
})

