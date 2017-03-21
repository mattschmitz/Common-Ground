var promise = require('bluebird');
var createTables = require('./tablesConfig.js');
var databaseName = 'genial_giraffes';
var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);


// establish a pgp connection to initialize the database
var database = pgp({})
// drop database if it exists
database.query('DROP DATABASE IF EXISTS genial_giraffes').then(function () {
	return database.query('CREATE DATABASE genial_giraffes')
}).then(function () {
	pgp.end();
	db = pgp({database: databaseName})
	return db;
	
}).then(function(db) {
	createTables(db);
	pgp.end();
	return db
})


var connection = {
	host: 'localhost',
    port: 5432,
    database: databaseName,
    user: '',
    password: ''
}
// re-establish a connection to export as a module
// will come back to re-factor to connecting pgp once

module.exports.db = pgp(connection)
pgp.end()
