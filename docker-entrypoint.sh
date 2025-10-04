#!/bin/bash
# docker entrypoint script to setup database and start server

set -e

echo "Running database setup..."
node js/Node/copyDB_PG.js

echo "Starting server..."
exec node js/Node/server.js
