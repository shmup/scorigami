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

# expose app port
EXPOSE 8081

# start server
CMD ["node", "js/Node/server.js"]
