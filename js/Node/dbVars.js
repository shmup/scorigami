// local database configuration (git assume-unchanged after setup)
const DATABASE_URL = "postgres://{{USERNAME}}:{{PASSWORD}}@{{SERVER HOST}}:{{PORT}}/{{DATABASE NAME}}";
const ADD_DEBUG_TABLES = true; // creates a second set of tables, identical to the first set that can be used for testing

export default {
	DATABASE_URL,
	ADD_DEBUG_TABLES
};