var database = require('../index.js')

var db = database.db

//find a user given an inputted username
var findUser = function (username) {
	var queryString = 'SELECT  * FROM users WHERE username=$1';
	db.query(queryString, [username])
	.then( (users) => {
			console.log('users!')
			return (
				users
			)
	});
}

//create a new user given a user object that contains:
// 1. user-chosen username
// 2. giraffe-generated hash value
// 3. giraffe-generated salt value

var createUser = function (user) {

	var newUser = {
		username: user.username,
		
	}

	db.query('INSERT INTO $1~ SET $2', ['users', newUser])
	.then( (data) => {
		console.log('data!')
		return (
			data
		)
	})
}

module.exports = {
	findUser: findUser,
	createUser: createUser
};
