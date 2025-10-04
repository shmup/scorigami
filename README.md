# Scorigami

Scorigami is a concept thought up by Jon Bois. It is the art of building final scores that have never happened before in NFL history. Due to the unique nature of how points are scored in (American) Football, where it is impossible to score 1 point on its own, as well as the rarity of the 2 point safety and 8 point touchdown and 2 point conversion, there are a lot of scores that are possible, but have never happened.

This project is dedicated to tracking all scorigami throughout history and keeping the scorigami chart up to date at all times.

## Getting Started

### Quick Start with Docker Compose

The easiest way to get started is with Docker Compose:

```bash
docker compose up
```

This will:
- Start a PostgreSQL database
- Build and run the app
- Populate the database with production data
- Make the app available at [localhost:8081](http://localhost:8081/)

### Manual Setup

#### Prerequisites

You will need [Node.js](https://nodejs.org/en/) (v24 or later) and [npm](https://www.npmjs.com/).

You will also need a PostgreSQL server in order to run and develop for the server. For information on how to set up a server, see [this tutorial](https://www.techrepublic.com/blog/diy-it-guy/diy-a-postgresql-database-server-setup-anyone-can-handle/). After setting up the server, be sure to create a database on that server (the tutorial has instructions for that as well).

#### Installing

Clone the repository and install dependencies

```bash
git clone https://github.com/Merry3750/scorigami.git # or clone your own fork
cd scorigami
npm install
```

Configure your database connection. Either set the `DATABASE_URL` environment variable:

```bash
export DATABASE_URL="postgres://{{USERNAME}}:{{PASSWORD}}@{{SERVER HOST}}:{{PORT}}/{{DATABASE NAME}}"
```

Or edit `/js/Node/dbVars.js`:

```javascript
var DATABASE_URL = "postgres://{{USERNAME}}:{{PASSWORD}}@{{SERVER HOST}}:{{PORT}}/{{DATABASE NAME}}";
var ADD_DEBUG_TABLES = true; //creates a second set of tables for testing
```

Populate your database:

```bash
npm run setup
```

Run the app:

```bash
npm start
```

Your app should now be running on [localhost:8081](http://localhost:8081/)

### Development

While developing on the React frontend, files will not auto reload. To recompile the React code after making changes:

```bash
npm run build
```

Then refresh the page in your browser.

#### Code Quality

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The linter runs automatically via git pre-commit hooks to ensure code quality.

## Authors

* **Andrew Merriman** - *Initial work* - [Merry3750](https://github.com/Merry3750)

See also the list of [contributors](https://github.com/Merry3750/scorigami/graphs/contributors) who participated in this project.

## Acknowledgments

* Historical data from [Pro Football Reference](https://www.pro-football-reference.com/)
* Logos from [SportsLogos.Net](http://www.sportslogos.net/)
* Prediction Data and algorithms by Dave Mattingly [@dpmattingly](https://twitter.com/dpmattingly)
* CSS redesign by [Brian Sayre](https://github.com/briansayre)