// database setup script that fetches production data and populates local postgres
import { Client } from "pg";
import dbVars from "./dbVars.js";

const client = new Client({
	connectionString: dbVars.DATABASE_URL,
});

client.connect();

var numTables = dbVars.ADD_DEBUG_TABLES ? 4 : 2;
var numDone = 0;

fetch("http://nflscorigami.com/copydb")
	.then((response) => response.json())
	.then((data) => {
		var queryString = "DROP TABLE IF EXISTS scores;\n";
		queryString += "CREATE TABLE IF NOT EXISTS scores (";
		queryString += "pts_win INTEGER, ";
		queryString += "pts_lose INTEGER, ";
		queryString += "count INTEGER, ";
		queryString += "first_date DATE, ";
		queryString += "first_team_win TEXT, ";
		queryString += "first_team_lose TEXT, ";
		queryString += "first_team_home TEXT, ";
		queryString += "first_team_away TEXT, ";
		queryString += "first_link TEXT, ";
		queryString += "last_date DATE, ";
		queryString += "last_team_win TEXT, ";
		queryString += "last_team_lose TEXT, ";
		queryString += "last_team_home TEXT, ";
		queryString += "last_team_away TEXT, ";
		queryString += "last_link TEXT";
		queryString += ")";

		client.query(queryString, (err, _res) => {
			if (err) {
				console.log("error creating scores table");
				console.log(err);
			} else {
				setupScoresTable(data, false);
			}
		});

		var queryString2 = "DROP TABLE IF EXISTS metadata;\n";
		queryString2 += "CREATE TABLE IF NOT EXISTS metadata (";
		queryString2 += "description TEXT, ";
		queryString2 += "data_int INTEGER, ";
		queryString2 += "data_text TEXT, ";
		queryString2 += "data_date DATE";
		queryString2 += ")";

		client.query(queryString2, (err, _res) => {
			if (err) {
				console.log("error creating metadata table");
				console.log(err);
			} else {
				setupMetadataTable(data, false);
			}
		});

		if (dbVars.ADD_DEBUG_TABLES) {
			queryString = queryString.split("scores").join("scores_DEBUG");
			client.query(queryString, (err, _res) => {
				if (err) {
					console.log("error creating scores table");
					console.log(err);
					checkDone();
				} else {
					setupScoresTable(data, true);
				}
			});

			queryString2 = queryString2.split("metadata").join("metadata_DEBUG");
			client.query(queryString2, (err, _res) => {
				if (err) {
					console.log("error creating metadata table");
					console.log(err);
					checkDone();
				} else {
					setupMetadataTable(data, true);
				}
			});
		}
	})
	.catch((error) => {
		console.log("Error fetching data:", error);
		client.end();
	});

//client.end();

function setupScoresTable(data, isDebugTable) {
	let queryString = "";
	for (let i = 0; i < data.scores.length; i++) {
		const score = data.scores[i];

		const first_date = score.first_date.substr(0, 10);
		const last_date = score.last_date.substr(0, 10);

		queryString += "INSERT INTO scores";
		queryString += isDebugTable ? "_DEBUG" : "";
		queryString +=
			" (pts_win, pts_lose, count, first_date, first_team_win, first_team_lose, first_team_home, first_team_away, first_link, last_date, last_team_win, last_team_lose, last_team_home, last_team_away, last_link) VALUES (";
		queryString += `${score.pts_win}, `;
		queryString += `${score.pts_lose}, `;
		queryString += `${score.count}, `;
		queryString += `TO_DATE('${first_date}', 'YYYY-MM-DD'), `;
		queryString += `'${score.first_team_win}', `;
		queryString += `'${score.first_team_lose}', `;
		queryString += `'${score.first_team_home}', `;
		queryString += `'${score.first_team_away}', `;
		queryString += `'${score.first_link}', `;
		queryString += `TO_DATE('${last_date}', 'YYYY-MM-DD'), `;
		queryString += `'${score.last_team_win}', `;
		queryString += `'${score.last_team_lose}', `;
		queryString += `'${score.last_team_home}', `;
		queryString += `'${score.last_team_away}', `;
		queryString += `'${score.last_link}');\n`;
	}

	client.query(queryString, (err, _res) => {
		if (err) {
			console.log("error inserting into scores table");
			console.log(err);
		} else {
			console.log(`added scores table${isDebugTable ? " (DEBUG)" : ""}`);
		}
		checkDone();
	});
}

function setupMetadataTable(data, isDebugTable) {
	let queryString = "";
	for (let i = 0; i < data.metadata.length; i++) {
		const metadatum = data.metadata[i];

		const data_int = metadatum.data_int === null ? "NULL" : metadatum.data_int;
		const data_text =
			metadatum.data_text === null ? "NULL" : `'${metadatum.data_text}'`;
		const data_date =
			metadatum.data_date === null
				? "NULL"
				: `TO_DATE('${metadatum.data_date.substr(0, 10)}', 'YYYY-MM-DD')`;

		queryString += "INSERT INTO metadata";
		queryString += isDebugTable ? "_DEBUG" : "";
		queryString += " (description, data_int, data_text, data_date) VALUES (";
		queryString += `'${metadatum.description}', `;
		queryString += `${data_int}, `;
		queryString += `${data_text}, `;
		queryString += `${data_date});\n`;
	}

	queryString += "INSERT INTO metadata";
	queryString += isDebugTable ? "_DEBUG" : "";
	queryString += ` (description, data_int) VALUES ('hit_counter', ${0});`;

	client.query(queryString, (err, _res) => {
		if (err) {
			console.log("error inserting into metadata table");
			console.log(err);
		} else {
			console.log(`added metadata table${isDebugTable ? " (DEBUG)" : ""}`);
		}
		checkDone();
	});
}

function checkDone() {
	numDone++;
	if (numDone >= numTables) {
		client.end();
	}
}
