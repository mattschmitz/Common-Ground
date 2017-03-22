var database = require('../index.js')

var db = database.db

var findById_Anchors = function (username) {
	return db.query('SELECT * FROM anchors where username=$1', username)
}

var storeAnchor = function (username, anchor_name, anchor_coordinates, anchor_address, travel_mode) {
	return db.query('INSERT INTO anchors (username, travel_mode, anchor_name, anchor_coordinates, anchor_address) SELECT $1, $2, $3, $4, $5 WHERE NOT EXISTS  (select anchor_coordinates from anchors where anchor_coordinates=$6) RETURNING id', [username, travel_mode, anchor_name, anchor_coordinates, anchor_address, anchor_coordinates])
}

var deleteAnchor = function (rowId) {
	console.log(rowId, 'deleteAnchor')
	return db.query('DELETE FROM anchors WHERE id=$1', [rowId])
}

module.exports = {
	findById_Anchors: findById_Anchors,
	storeAnchor: storeAnchor,
	deleteAnchor: deleteAnchor
};

