module.exports = function (db) {
	console.log('start users table!')
	return db.query('\
		CREATE TABLE IF NOT EXISTS users ( \
		id SERIAL PRIMARY KEY, \
		username VARCHAR(50), \
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
				CREATE TABLE IF NOT EXISTS anchors ( \
				id SERIAL PRIMARY KEY, \
				username VARCHAR(25), \
				travel_mode VARCHAR(25), \
				anchor_name VARCHAR(255), \
				anchor_coordinates VARCHAR(255), \
				anchor_address VARCHAR(255), \
				anchor_splitAddress VARCHAR(255) [] \
				); \
			')
	})
} 



