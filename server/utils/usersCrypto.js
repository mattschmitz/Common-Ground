var crypto = require('crypto');

var createHashedPassword = function(password, salt) {
	var hash = crypto.createHash('sha256')
                     .update(password + salt)
                     .digest('hex');
    // console.log(password, 'password')
    // console.log(hash, 'hash')
	return hash;
}

var createSalt = function() {
	var salt = crypto.randomBytes(20).toString('hex');
	console.log(salt, 'salt')
	return salt;
}

var compareHash = function (attemptedPassword, storedHash, salt) {
	var attemptedHash = crypto.createHash('sha256')
							  .update(attemptedPassword + salt)
							  .digest('hex')

    // console.log(attemptedHash, 'attemptedHash')
    // console.log(storedHash, 'storedHash')
    // console.log(attemptedPassword, 'attemptedPassword')
	return (attemptedHash === storedHash);
}

module.exports = {
	createHashedPassword: createHashedPassword,
	createSalt: createSalt,
	compareHash: compareHash
}

