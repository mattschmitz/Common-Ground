DROP DATABASE IF EXISTS genial-giraffes;
CREATE DATABASE genial-giraffes;

\c 'genial-giraffes';

CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY,
	username VARCHAR(25), --username 
	hash VARCHAR(255), --hashed password
	salt VARCHAR(255) --SALT for hashed password
);

CREATE TABLE IF NOT EXISTS sessions (
	id INTEGER PRIMARY KEY,
	username VARCHAR(255), --username
	session_id VARCHAR(255), --hashed session id
	salt VARCHAR(255) --SALT for hashed session id
);

CREATE TABLE IF NOT EXISTS anchors (
	id INTEGER PRIMARY KEY,
	username VARCHAR(25),
	anchor_name VARCHAR(25), --anchor name
	anchor_location VARCHAR(255) --anchor location
);