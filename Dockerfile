# dockerfile for scorigami node.js app
FROM node:24-slim

WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy source code
COPY . .

# build react frontend
RUN npm run build

# copy and setup entrypoint
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# expose app port
EXPOSE 8081

# start server via entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]
