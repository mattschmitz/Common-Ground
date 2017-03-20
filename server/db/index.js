
var promise = require('bluebird');

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connection = {
	host: 'localhost',
    port: 5432,
    database: 'genial-giraffes',
    user: 'root',
    password: ''
}

var db = pgp(connection)



