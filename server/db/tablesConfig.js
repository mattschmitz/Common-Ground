module.exports = function (db) {
	console.log('start users table!')
	return db.query('\
		CREATE TABLE IF NOT EXISTS users ( \
		id SERIAL PRIMARY KEY, \
		username VARCHAR(25), \
		hash VARCHAR(255), \
		salt VARCHAR(255) \
		); \
	').then(function () {
		console.log('start sessions table!')
		return db.query('\
				CREATE TABLE IF NOT EXISTS sessions ( \
				id SERIAL PRIMARY KEY, \
				username VARCHAR(255), \
				session_id VARCHAR(255), \
				salt VARCHAR(255) \
				); \
			')
	}).then(function () {
		console.log('start anchor table!')
		return db.query(' \
				CREATE TABLE IF NOT EXISTS anchor ( \
				id SERIAL PRIMARY KEY, \
				anchor_name VARCHAR(25), \
				anchor_location VARCHAR(25) \
				); \
			')
	})
} 



